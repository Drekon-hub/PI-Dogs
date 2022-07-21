import React from "react";
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function a(){
    return (
        <div className="container">
            <h1>AGUANTEN LOS BULL TERRIERES</h1>
            
            <Link to={'/home'}>
                <button>Go Home</button>
            </Link>
        </div>
    )
}