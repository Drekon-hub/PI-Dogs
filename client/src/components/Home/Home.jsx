import React from "react";
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  { getDogs }  from '../../redux/actions.js'
import Card from '../DogsCards/DogsCards'
import NavBar from "../../NavBar/NavBar.jsx";
import './Home.css'

export default function Home(){
    //! estos son mis hoocks------------------------------
    const dispatch = useDispatch();
    useEffect(() => dispatch(getDogs()), [dispatch]);
    const dogs = useSelector((state) => state.dogs);

    return (
        <div>
            <NavBar/>
            <h1>AGUANTEN LOS BULL TERRIERES PERO EN EL HOME</h1>

                <div className="cards">
                {
                    dogs?.map((dog) => {
                        return (
                            <div>
                                <Card
                                key={dog.id}
                                id={dog.id}
                                image={dog.image}
                                name={dog.name}
                                temperament={dog.temperament}
                                weight_min={dog.weight_min}
                                weight_max={dog.weight_max}
                                />
                            </div>
                        )
                    })
                }
                </div>
        </div>
        
    )
}