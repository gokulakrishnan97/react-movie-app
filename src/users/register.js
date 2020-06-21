import React, { Component } from 'react';
import Login from '../common/login';


export default class RegisterForm extends Component{
  
  state ={
    account:{
      name: "",
      password: "",
      email:""
    },
    errors:{}
  }

  validateError = () =>{
    let errors = {};
    let { account } = this.state;
    if(account.userName === ''){
      errors.name = 'Name is required';
    }
    if(account.password === ''){
      errors.password = 'Password is required';
    }
    if(account.email === ''){
      errors.email = 'Email is required';
    }
    return Object.keys(errors).length === 0? null: errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateError();
    this.setState({ errors: errors || {} });
  }

  validateInput(inp){
    let errors = {};
    if(inp.name === 'email' && inp.value.trim() === ''){
      return 'Username is required';
    }
    if(inp.name === 'password' && inp.value.trim() === ''){
      return 'Password is required';
    }
    if(inp.name === 'name' && inp.value.trim() === ''){
      return 'Name is required';
    }
    return null;
  }

  handleChange = ({ target }) => {
    let errors = {...this.state.errors};
    let errorMessage = this.validateInput(target);
    if(errorMessage){
      errors[target.name] = errorMessage
    }else {
      delete errors[target.name]
    }
    let account = {...this.state.account};
    account[target.name] = target.value;
    this.setState({ account, errors });
  }
  render(){
    return(
      <form onSubmit={ this.handleSubmit }>
        <Login value='Name' name='name' onHandleChange = { this.handleChange } errors= '' />
        <Login value='Email' name='email' onHandleChange = { this.handleChange } errors= '' />
        <Login value='Password' name='password' onHandleChange = { this.handleChange } errors= '' />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    )
  }
}