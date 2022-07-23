import React from 'react';
import styles from './Pagination.module.css';
const Pagination = ({ dogsPerPage, allDogs, pagination, currentPage,firstPage, lastPage,prevPage, nextPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav className={styles.nav}>
        <ul className={styles.container_page}>
          <button className={currentPage === 1 ? styles.nose : styles.button} onClick={() => firstPage()}> ◄◄ </button>
          <button  className={currentPage === 1 ? styles.nose : styles.button} onClick={() => prevPage()}> ◄ </button>

          {pageNumbers &&
            pageNumbers.map((num) => (
              <li key={num}>
                <button className={styles.button} onClick={() => pagination(num)}> {num} </button>
              </li>
            ))}

          <button className={currentPage === 22 ? styles.nose : styles.button} onClick={() => nextPage()}> ► </button>
          <button className={currentPage === 22 ? styles.nose : styles.button} onClick={() => lastPage()}> ►► </button>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
