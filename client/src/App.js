import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import DogsDetails from './components/DogsDetails/DogsDetails.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/home/:id" component={DogsDetails}/>
    </div>
  );
}

export default App;
