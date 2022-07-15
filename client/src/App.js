import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import DogsDetails from './components/DogsDetails/DogsDetails.jsx';
import Form from './components/Form/Form.jsx';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home} />
      <Route path='/home/:id' component={DogsDetails} />
      <Route exact path='/dogs' component={Form} />
    </div>
  );
}

export default App;
