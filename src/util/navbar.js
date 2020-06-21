import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class NavBar extends Component{
  
  render(){
    let token = localStorage.getItem('token');
    const onLogoutHandler = () =>{
    localStorage.removeItem('token');
    //window.location = "/"
    console.log('token ', token);
  }
    return ( 
    <div className = 'navbar navbar-collapse' id='navbar'>
      <div className = 'navbar nav'>
        <NavLink className = 'nav-item nav-link' to="/movies">Movies</NavLink>
        <NavLink className = 'nav-item nav-link' to="/customers">Customers</NavLink>
        <NavLink className = 'nav-item nav-link' to="/rentals">Rentals</NavLink>
        {
          (!token && <React.Fragment><NavLink className = 'nav-item nav-link' to="/login"> Login </NavLink>
        <NavLink className = 'nav-item nav-link' to="/register"> Register </NavLink></React.Fragment>)
        }
        {
          (token && <NavLink className = 'nav-item nav-link' to="/" onClick = { onLogoutHandler() }> Logout </NavLink>)
        }

      </div>
    </div>
   );
  }
  
}
 
export default NavBar;