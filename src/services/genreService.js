import React from 'react';
import axios from 'axios';


const GetGenres = async () => {
  const endpoint = 'http://localhost:3900/api/genres';
  const genres = await axios.get(endpoint);
  return genres;
};
export default GetGenres;