import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from '../../redux/actions.js'

export default function Detail(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const theDogs = useSelector((state) => state.detail)
    
    return (
        <div>
            <section>
                <Link to={'/home'}>
                    <button>Voler</button>
                </Link>
            </section>

            <section>
                {
                    theDogs.name ?
                    <div>
                        <div>
                            <h1 key={theDogs.name}>
                                {theDogs.name}
                            </h1>
                        </div>
                        <div>
                            <img src={theDogs.image} alt="Not found" width='300px' height='200px'/>
                        </div>
                        <section>
                            <div>
                                <h2>Temperaments: {theDogs.temperament}</h2>
                                <h2>Weight_min: {theDogs.weight_min}</h2>
                                <h2>Weight_max: {theDogs.weight_max}</h2>
                                <h2>Height_min: {theDogs.height_min}</h2>
                                <h2>Height_max: {theDogs.height_max}</h2>
                                <h2>Life_span: {theDogs.life_span}</h2>
                            </div>
                        </section>
                    </div>
                    :
                    <p>Loading...</p>
                }
            </section>
        </div>
    )
}