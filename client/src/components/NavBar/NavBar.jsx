import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import bt from '../../img/bt.png';

export default function NavBar() {
  return (
    <header>
      <Link to="/home">
        <img className={styles.brand} src={bt} alt="a" width="50px" height="50px" />
      </Link>
      {/* <div className="brand"><a href="#">Dogs</a></div>    */}

      <nav>
        <ul className={styles.ul}>
        <Link to='/'>
            <li className={styles.li}>Index</li>
          </Link>
          <Link to='/home'>
            <li className={styles.li}>Home</li>
          </Link>
          <Link to='/home'>
            <li className={styles.li}>About</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
