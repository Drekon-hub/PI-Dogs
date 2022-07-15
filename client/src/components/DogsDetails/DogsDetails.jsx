import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../../redux/actions.js';
import styles from './DogsDetails.module.css';

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const theDogs = useSelector((state) => state.detail);

  let temp = '';
  typeof theDogs.temperaments === 'object'
    ? (temp = theDogs.temperaments
        .map((t) => {
          return t.name;
        })
        .join(', '))
    : (temp = theDogs.temperaments);
console.log(theDogs.temperaments)
  return (
    <div>
      <section className={styles.modal}>
        {theDogs.name ? (
          <div className={styles.modal_container}>
            <Link to={'/home'}>
              <button className={styles.button}>
                <svg
                  height='16'
                  width='16'
                  xmlns='http://www.w3.org/2000/svg'
                  version='1.1'
                  viewBox='0 0 1024 1024'
                >
                  <path d='M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z'></path>
                </svg>
                <span>Back</span>
              </button>
            </Link>
            <div>
              <h1 className={styles.modal_title} key={theDogs.name}>
                {theDogs.name}
              </h1>
            </div>
            <img
              className={styles.modal_image}
              src={theDogs.image}
              alt='Not found'
              width='300px'
              height='200px'
            />
            <div className={styles.modal_paragraph}>
              <h2>Temperaments: {temp}</h2>
              <h2>Weight_min: {theDogs.weight_min}</h2>
              <h2>Weight_max: {theDogs.weight_max}</h2>
              <h2>Height_min: {theDogs.height_min}</h2>
              <h2>Height_max: {theDogs.height_max}</h2>
              <h2>Life_span: {theDogs.life_span}</h2>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
}
