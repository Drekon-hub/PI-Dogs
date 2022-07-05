import React from "react";
import './NavBar.css'

export default function NavBar(){
    return (
        <header>
            <div class="brand"><a href="#">Dogs</a></div>

            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Our Works</a></li>
                </ul>
            </nav>
        </header>
    )
}