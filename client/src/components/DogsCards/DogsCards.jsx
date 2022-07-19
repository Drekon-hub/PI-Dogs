import React from 'react';
import { Link } from 'react-router-dom';
import './DogsCards.css';

export default function Card({ image, name, temperaments, weight_min, weight_max, id }) {
  let temp = '';
  typeof temperaments === 'object'
    ? (temp = temperaments
        .map((t) => {
          return t.name;
        })
        .join(', '))
    : (temp = temperaments);

  return (
    <div className="card">
      <Link to={`/home/${id}`}>
        <img className="card-image" src={image} alt="Dogi" />
      </Link>
      <div className="category">
        {' '}
        <h2>{name}</h2>{' '}
      </div>
      <div className="heading">
        {' '}
        {temp}
        <div className="author">
          {' '}
          Weight min: <span className="name">{weight_min}</span>
          <br />
          Weight max: <span className="name">{weight_max}</span>
        </div>
      </div>
    </div>
  );
}
