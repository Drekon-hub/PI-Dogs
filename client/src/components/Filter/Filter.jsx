import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filterDogsByTemperament, getTemperament } from '../../redux/actions';

export default function Fiter({ setCurrentPage }) {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getTemperament()), [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);
  temperaments.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });
  function handleChange(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
  }
  return (
    <div>
      <h2>Temperament</h2>
      <select onChange={(e) => handleChange(e)}>
        <option defaultValue value='all'>
          AllTemps
        </option>
        {temperaments.map((temp) => (
          <option value={temp.name} key={temp.name}>
            {temp.name}
          </option>
        ))}
      </select>
    </div>
  );
}
