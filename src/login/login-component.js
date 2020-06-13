import React, { Component  } from 'react';
import Login from '../common/login';

export default class Form extends Component{
  
  constructor(props) {
   super();
  }

  state ={
    account:{
      userName: "",
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
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateError();
    this.setState({ errors: errors || {} });
  }

  handleChange = (e) => {
    console.log(e.target.value);
    let account = {...this.state.account};
    account[e.target.name] = e.target.value;
    this.setState({ account });
  }

  render(){
    let { errors } = this.state;
    return(
    <div>
      <form onSubmit={ this.handleSubmit }>
        <Login 
          name="userName" 
          value = "email" 
          onHandleChange = { this.handleChange }
          errors = { errors.email }/>
        <Login 
          name="password" 
          value = "password" 
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
