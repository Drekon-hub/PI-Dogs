import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dogSearchBar } from '../../redux/actions.js';
import styles from './SearchBar.module.css';

export default function SearchBar({ firstPage }) {
  const dispatch = useDispatch();
  const [dog, setDog] = useState('');

  function handleSearchInput(e) {
    e.preventDefault();
    setDog(e.target.value);
  }

  function handleSubmitButton(e) {
    e.preventDefault();
    firstPage();
    if (dog !== '') {
      dispatch(dogSearchBar(dog));
      setDog('');
    } else {
      alert('Please igrese a breed to search');
    }
  }

  return (
    <div>
      <form className="searchBar">
        <input
          placeholder="Search dog for breed"
          type="text"
          onChange={(e) => handleSearchInput(e)}
          className={styles.input}
          value={dog}
        />
        <button className={styles.button} type="submit" onClick={(e) => handleSubmitButton(e)}>
          🔍
        </button>
      </form>
    </div>
  );
}
