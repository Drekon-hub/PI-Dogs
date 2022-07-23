import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getDogs, postDogs, getTemperament } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import styles from './Form.module.css';
import "./Form.css";

export default function Form() {
  const [errors, setErrors] = useState({});
  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "🔴Enter a Name to the breed of dogs";
    } else if (!/^[A-Za-z\n -]+$/.test(input.name)) {
      errors.name = "🔴The name must contain only letters";
    } else if (!/^[\s\S]{0,25}$/.test(input.name)) {
      errors.name =
        "🔴The name of the dog can not have more than 25 characters";
    }
    if (!input.height_min) {
      errors.height_min =
        "🔴Enter a value for the minimum height of the breed ";
    } else if (!/^[0-9]{1,2}?$/.test(input.height_min)) {
      errors.height_min = "🔴Only numbers and maximum 2 characters";
    } else if (input.height_min > input.height_max) {
      errors.height_min =
        "🔴The minimum height cannot be greater than the maximum height";
    }
    if (!input.height_max) {
      errors.height_max =
        "🔴Enter a value for the minimum height of the breed ";
    } else if (!/^[0-9]{1,2}?$/.test(input.height_max)) {
      errors.height_max = "🔴Only numbers and maximum 2 characters";
    } else if (input.height_max < input.height_min) {
      errors.height_max =
        "🔴The maximum height cannot be less than the minimum height";
    }
    if (!input.weight_min) {
      errors.weight_min =
        "🔴Enter a value for the minimum height of the breed ";
    } else if (!/^[0-9]{1,2}?$/.test(input.weight_min)) {
      errors.weight_min = "🔴Only numbers and maximum 2 characters";
    } else if (input.weight_min > input.weight_max) {
      errors.weight_min =
        "🔴The minimum weight cannot be greater than the maximum weight";
    }
    if (!input.weight_max) {
      errors.weight_max =
        "🔴Enter a value for the minimum height of the breed ";
    } else if (!/^[0-9]{1,2}?$/.test(input.weight_max)) {
      errors.weight_max = "🔴Only numbers and maximum 2 characters";
    } else if (input.weight_max < input.weight_min) {
      errors.weight_max =
        "🔴The maximum weight cannot be less than the minimum weight";
    }
    if (!input.life_span) {
      errors.life_span = "🔴Enter a value for the minimum height of the breed ";
    } else if (!/^[0-9]{1,2}?$/.test(input.life_span)) {
      errors.life_span = "🔴Only numbers and maximum 2 characters";
    }
    return errors;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
  const temperament = useSelector((state) => state.temperaments);
  // console.log(getTemperament());

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  //!Funciones "handles" de mi formulario.
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  //!Con éste, modifico el estado de temperament y que vaya verificando si ya estaba o no incluido en el array de temperament
  function handleSelect(e) {
    if (!input.temperament.includes(e.target.value) && e.target.value !== "-") {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          temperament: [...input.temperament, e.target.value],
        })
      );
    }
  }
  //!Con éste, hago dispatch del postActivities
  function handleSubmit(e) {
    if (
      input.name &&
      input.height_min &&
      input.height_max &&
      input.weight_min &&
      input.weight_max &&
      input.life_span &&
      input.temperament
    ) {
      e.preventDefault();
      dispatch(postDogs(input));
      alert("successfully bred dog");
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        image: "",
        temperament: [],
      });
    }
  }

  function handleDelete(temp) {
    setInput({
      ...input,
      temperament: input.temperament.filter((c) => c !== temp),
    });
    setErrors(
      validate({
        ...input,
        temperament: input.temperament.filter((c) => c !== temp),
      })
    );
  }

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)} className="form-style-7">
        <div className="buttonBack">
          <Link to="/home">
            <button className="back">
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1024"
              >
                <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
              </svg>
              <span>Back</span>
            </button>
          </Link>
        </div>
        <ul>
          <li>
            <label for="name">Name</label>
            <input
              placeholder="Dog breed"
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.name}
              name="name"
              autoComplete="off"
            />
            {errors.name && <span>{errors.name}</span>}
            <p>Enter breed name here</p>
          </li>
          <li>
            <label>Height Min</label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Height Min"
              type="text"
              value={input.height_min}
              name="height_min"
            />
            {errors.height_min && <span>{errors.height_min}</span>}
            <p>Enter the minimum height here</p>
          </li>
          <li>
            <label>Height Max</label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Height Max"
              type="text"
              value={input.height_max}
              name="height_max"
            />
            {errors.height_max && <span>{errors.height_max}</span>}
            <p>Enter max height here</p>
          </li>
          <li>
            <label>Weight Min:</label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Weight Min"
              type="text"
              value={input.weight_min}
              name="weight_min"
            />
            {errors.weight_min && <span>{errors.weight_min}</span>}
            <p>Enter minimum weight here</p>
          </li>
          <li>
            <label>Weight Max:</label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Weight Max"
              type="text"
              value={input.weight_max}
              name="weight_max"
            />
            {errors.weight_max && <span>{errors.weight_max}</span>}
            <p>Enter the maximum weight here</p>
          </li>
          <li>
            <label>Life Span:</label>
            <input
              placeholder="Life Span ❤"
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.life_span}
              name="life_span"
            />
            {errors.life_span && <span>{errors.life_span}</span>}
            <p>Enter life expectancy</p>
          </li>
          <li>
            <label> Image: </label>
            <input
              placeholder="URL"
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.image}
              name="image"
            />
            {errors.image && <span>{errors.image}</span>}
            <p>
              Enter here an image by url otherwise one will be assigned by
              default
            </p>
          </li>
          <div>
            <label>Temperaments</label>
            <select onChange={(e) => handleSelect(e)}>
              <optgroup label="Temperaments">
                <option disabled selected>
                  Select An Temperaments
                </option>
                {temperament?.map((temp) => {
                  return (
                    <option key={temp.name} name={temp.name}>
                      {temp.name}
                    </option>
                  );
                })}
              </optgroup>
            </select>
            <div>
              {errors.temperament && <p>{errors.temperament}</p>}
              {input.temperament.map((el) => (
                <div className="deleteTemperament" key={el}>
                  <span>{el}</span>
                  <button onClick={() => handleDelete(el)}>x</button>
                </div>
              ))}
            </div>
          </div>
          <li>
            {errors.name ||
            errors.height_min ||
            errors.height_max ||
            errors.weight_min ||
            errors.weight_max ||
            errors.life_span ||
            !input.name ||
            !input.height_min ||
            !input.height_max ||
            !input.weight_min ||
            !input.weight_max ||
            !input.life_span ||
            !input.temperament.length ? (
              <button disabled type="submit" className="icon-btn add-btn">
                <div className="add-icon"></div>
                <div className="btn-txt">Crete Dog</div>
              </button>
            ) : (
              <button type="submit" className="icon-btn add-btn">
                <div className="add-icon"></div>
                <div className="btn-txt">Crete Dog</div>
              </button>
            )}
          </li>
        </ul>
      </form>
    </section>
  );
}
