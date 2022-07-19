import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDogs, postDogs, getTemperament } from '../../redux/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Form() {
  const [errors, setErrors] = useState({});
  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = '🔴📋Enter a Name to the breed of dogs';
    } else if (!/^[A-Za-z.\n -]+$/.test(input.name)) {
      errors.name = '🔴The name must contain only letters';
    }
    if (!input.height_min) {
      errors.height_min = "🔴Enter a value for the minimum height of the breed ";
    }
    if (!input.height_min < 0) {
      errors.height_min = '🔴Enter real value fo the minimum height of the breed';
    }
    if (parseInt(input.height_min) <= 15) {
      errors.height_min = '🔴The minimum size must be greater than 15 cm';
    }
    if (!input.height_max > 999) {
      errors.height_max = '🔴Enter a  real value for the maximum weight of the breed';
    }
    if (!input.weight_min) {
      errors.weight_min = '🔴Enter a value for the minimum weight of the breed';
    }
    if (!input.weight_min < 0) {
      errors.weight_min = '🔴Enter a real value minimum weight of the breed';
    }
    if (!input.weight_max > 999) {
      errors.weight_max = '🔴Enter a  real value for the maximum weight of the breed';
    }
    if (input.life_span > 100) {
      errors.life_span = 'The life spon must be less than 100 years';
    }
    if (typeof input.image !== 'string') {
      errors.image = 'the imageUrl link is too big';
    }
    if (parseInt(input.image) > 250) {
      errors.image = 'the imageUrl link is too big';
    }
    if (!input.temperament) {
      errors.temperament = 'a';
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
  console.log(getTemperament());

  const [input, setInput] = useState({
    name: '',
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    life_span: '',
    image: '',
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
    if (!input.temperament.includes(e.target.value) && e.target.value !== '-') {
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
      input.image &&
      input.temperament
    ) {
      e.preventDefault();
      dispatch(postDogs(input));
      // dispatch(axios.post('/activities'))
      // console.log(axios.post('/activities',(input)))
      alert('Actividad creada');
      setInput({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        image: '',
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
      <section>
        <div>
          <Link to="/home">
            <button> Volver</button>
          </Link>
        </div>
      </section>

      <section>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name:</label>
            <input
              placeholder="Dog breed"
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.name}
              name="name"
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Height Min:</label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Height Min"
              type="number"
              max="50"
              min="1"
              value={input.height_min}
              name="height_min"
            />
            {errors.height_min && <p>{errors.height_min}</p>}
          </div>
          <div>
            <label>Height Max:</label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Height Max"
              type="number"
              max="50"
              min="1"
              value={input.height_max}
              name="height_max"
            />
            {errors.height_max && <p>{errors.height_max}</p>}
          </div>
          <div>
            <label>Weight Min:</label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Weight Min"
              type="number"
              max="50"
              min="1"
              value={input.weight_min}
              name="weight_min"
            />
            {errors.weight_min && <p>{errors.weight_min}</p>}
          </div>
          <div>
            <label>Weight Max:</label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Weight Max"
              type="number"
              max="50"
              min="1"
              value={input.weight_max}
              name="weight_max"
            />
            {errors.weight_max && <p>{errors.weight_max}</p>}
          </div>
          <div>
            <label>Life Span:</label>
            <input
              placeholder="Life Span ❤"
              onChange={(e) => handleChange(e)}
              type="number"
              max="30"
              min="1"
              value={input.life_span}
              name="life_span"
            />
            {errors.life_span && <p>{errors.life_span}</p>}
          </div>
          <div>
            <label> Image: </label>
            <input
              placeholder="URL"
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.image}
              name="image"
            />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div>
            <div>
              <label>Temperamentos</label>
              <select onChange={(e) => handleSelect(e)}>
                {temperament?.map((temp) => {
                  return (
                    <option key={temp.name} name={temp.name}>
                      {temp.name}
                    </option>
                  );
                })}
              </select>
              <div>
                {errors.temperament && <p>{errors.temperament}</p>}
                {input.temperament.map((el) => (
                  <div key={el}>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                  </div>
                ))}
              </div>
            </div>
            {!input.name ||
            !input.height_min ||
            !input.height_max ||
            !input.weight_min ||
            !input.weight_max ||
            !input.life_span ||
            !input.image ||
            !input.temperament.length ? (
              <button disabled type="submit">
                Crear Actividad!
              </button>
            ) : (
              <button type="submit">Crear Actividad!</button>
            )}
          </div>
        </form>
      </section>
    </section>
  );
}
