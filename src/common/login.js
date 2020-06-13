import React from 'react';
import _ from 'lodash';

const Login = (props) =>{
  let { value, name, onHandleChange, errors } = props
  return (
    <div className="form-group">
      <label for={ value }>{ value } </label>
      <input 
        type= { value } 
        name = { name } 
        onChange = { onHandleChange } 
        className="form-control" 
        id={value} 
        aria-describedby="emailHelp" />
        { errors && <p className = "alert alert-danger">{ errors }</p> }
    </div>
    
  )
}

export default Login;