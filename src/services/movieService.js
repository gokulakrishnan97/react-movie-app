import React from 'react';
import axios from 'axios';

export const getMovies = async() => {
  const endPoint = 'http://localhost:3900/api/movies';
  const movies = await axios.get(endPoint);
  return movies;
};
