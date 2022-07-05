import React from 'react';
import { Link } from "react-router-dom";

export default function Card({image, name, temperament, weight_min, weight_max,id}) {
    return (
            <div>
                <Link  to={`/home/${id}`}>
                    <img src={image} alt="Dog" width='300px' height='200px'/>
                </Link>
                <h5>Name: {name}</h5>
                <h5>Temperaments: {temperament}</h5>
                <h5>Weight_min: {weight_min}</h5>
                <h5>Weight_max: {weight_max}</h5>
            </div>
    )
}