import React from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './movie/movie';
import MovieDetail from './movie/movie-detail';
import Rental from './rentals/rental';
import Customer from './customers/customer';
import LoginForm from './login/login-component';
import RegisterForm from './users/register';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './util/navbar';


function App() {
  return (
    <React.Fragment>
      <div className = 'row' >
        <NavBar />
      </div>
      <Switch>
        <Route path = '/movies/:id' component = { MovieDetail } />
        <Route path = '/movies' component = { Movie } />
        <Route path = '/customers' component = { Customer } />
        <Route path = '/rentals' component = { Rental } />
        <Route path = '/login' component = { LoginForm } />
        <Route path = '/register' component = { RegisterForm } />
        <Redirect from='/' to='/movies' />
      </Switch>
    </React.Fragment>
  );
}

export default App;
