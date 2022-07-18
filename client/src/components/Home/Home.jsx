import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDogs,
  order,
  filterDogsByCreated,
  filterWeight,
} from '../../redux/actions.js';
import Card from '../DogsCards/DogsCards';
import NavBar from '../NavBar/NavBar';
import Pagination from '../Pagination/Pagination.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Filter from '../Filter/Filter.jsx';
import './Home.css';

export default function Home() {
  //! estos son mis hoocks------------------------------
  const dispatch = useDispatch();
  useEffect(() => dispatch(getDogs()), [dispatch]);
  const allDogs = useSelector((state) => state.dogs);
  //!paginado-------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = (currentPage) => {
    setCurrentPage((currentPage = Math.ceil(allDogs.length / 8)));
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(allDogs.length / dogsPerPage))
      setCurrentPage(currentPage + 1);
  };

  function handleReload() {
    window.location.href = window.location.href;
  }
  // function handleReload(e) {
  //   e.preventDefault();
  //   dispatch(getDogs());
  //   alert('Breed are Reload');
  // }
  const [, setOrden] = useState('');

  function handleOrder(e) {
    e.preventDefault();
    dispatch(order(e.target.value));
    setCurrentPage(1);
    setOrden(`${e.target.value}`);
  }
  function handleFilterCreate(e) {
    e.preventDefault();
    dispatch(filterDogsByCreated(e.target.value));
    setCurrentPage(1);
  }
  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(filterWeight(e.target.value));
    setOrden(`${e.target.value}`);
    setCurrentPage(1);
  }

  return (
    <div>
      <NavBar />
      <div className="img-lindo">
        <h1 className="title">AGUANTEN LOS BULL TERRIERES PERO EN EL HOME</h1>
        <div className="searchBar">
          <SearchBar firstPage={firstPage} />
        </div>
        <Link to={'/dogs'}>
          <button className="btn-create">Create dog</button>
        </Link>
      </div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Crystal_Project_Reload.png"
        width="70px"
        height="70px"
        onClick={(e) => handleReload(e)}
        alt=""
      />
      <div className="filtros">
        <Filter setCurrentPage={setCurrentPage} />
        <div>
          <h2>Weitght Sort</h2>
          <select
            onChange={(e) => {
              handleOrderByWeight(e);
            }}
          >
            <option defaultValue value="all" hidden>
              Order
            </option>
            <option value="asc">Heaviest to Lightest</option>
            <option value="desc">Lightest to Heaviest</option>
          </select>
        </div>
        <div>
          <h2>Alphabetical Sort</h2>
          <select onChange={(e) => handleOrder(e)}>
            <option value="selected" onClick={(e) => handleReload(e)}>
              All
            </option>
            <option value="asc">Asc A-Z</option>
            <option value="des">Desc Z-A</option>
          </select>
        </div>
        <div>
          <h2>Order By Created</h2>
          <select onChange={(e) => handleFilterCreate(e)}>
            <option value="all">All</option>
            <option value="api">Existent breeds</option>
            <option value="created">Created breeds</option>
          </select>
        </div>
      </div>

      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        pagination={pagination}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
        prevPage={prevPage}
        nextPage={nextPage}
      />

      <div className="cards">
        {currentDogs?.map((dog) => {
          return (
            <div>
              <Card
                key={dog.id}
                id={dog.id}
                image={dog.image}
                name={dog.name}
                temperaments={dog.temperaments}
                weight_min={dog.weight_min}
                weight_max={dog.weight_max}
              />
            </div>
          );
        })}
      </div>

      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        pagination={pagination}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
}
