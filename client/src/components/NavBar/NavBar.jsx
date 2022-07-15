import React from "react";
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import bt from '../../img/bt.png';

export default function NavBar(){
    return (
        <header>
            <Link to='/home'>
            <img className={styles.brand} src={bt} alt="a" width='50px' height='50px'/>
            </Link>
            {/* <div className="brand"><a href="#">Dogs</a></div>    */}

            <nav>
                <ul className={styles.ul}>
                    <li className={styles.li}>Home</li>
                    <li className={styles.li}>Features</li>
                    <li className={styles.li}>Services</li>
                    <li className={styles.li}>Our Works</li>
                </ul>
            </nav>
        </header>
    )
}