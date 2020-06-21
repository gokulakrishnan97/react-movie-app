import React, { Component  } from 'react';
import Login from '../common/login';
import { Auth } from '../service/auth';

export default class LoginForm extends Component{
  
  constructor(props) {
   super();
  }

  state ={
    account:{
      username: "",
      password: ""
    },
    errors:{}
  }

  validateError = () =>{
    let errors = {};
    let { account } = this.state;
    if(account.userName === ''){
      errors.email = 'Email is required';
    }
    if(account.password === ''){
      errors.password = 'Password is required';
    }
    return Object.keys(errors).length === 0? null: errors;
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.account);
    let token = await Auth({
        email: this.state.account.username,
        password: this.state.account.password
    })
    console.log(token)
    localStorage.setItem('token', token);
   // window.location = "/"
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
    let { errors } = this.state;
    return(
    <div>
      <form onSubmit={ this.handleSubmit }>
        <Login 
          name="username" 
          value = "Username" 
          onHandleChange = { this.handleChange }
          errors = { errors.email }/>
        <Login 
          name="password" 
          value = "Password" 
          onHandleChange = { this.handleChange }
          errors = { errors.password } />
        {/* <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" name = "userName" onChange = { this.handleChange } className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" name = "password" onChange = { this.handleChange }className="form-control" id="exampleInputPassword1" />
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
  }
}
