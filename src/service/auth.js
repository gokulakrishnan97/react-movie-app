import React from 'react';
import axios from 'axios';

export const Auth = async (userData) => {
  const { data: jwtToken } = await axios.post('http://localhost:3900/api/auth', userData);
  console.log('jwt ', jwtToken);
  return jwtToken;
}