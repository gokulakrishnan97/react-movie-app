import React from 'react';
import { NavLink } from 'react-router-dom';
import Like from '../common/like';
import paginate from '../util/paginate';

const MovieTable = (props) => {
  let { movieDetail, currentPage, pageSize, selectedGenre, titles} = props.movies;
  const getHeadings = ()=> {
    return (
      <thead>
        <tr>
          {titles.map((title)=> <th key = {title} className='m-4' style= {{ fontWeight: 'bold'}}> {title} </th>)}
        </tr>
      </thead>
    );
  };

  const getMovies = (movies)=> {
    let movie = movies.map((movie)=>{
    return (
      <tbody>
        <tr>
          <td> <NavLink  movies = {movie} to={`/movies/${movie._id}`}> { movie.title} </NavLink></td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td> <Like onClick={props.onLike} liked={movie.liked} movie={movie}/> </td>
          <td><button className='btn btn-danger' onClick= { () => props.onDelete(movie) }>delete</button></td>
        </tr>
      </tbody>
    )
    });
    return movie;
  }
  
  const showMoviesList = () => {
    let filterList = selectedGenre && selectedGenre._id? 
    movieDetail.filter((m)=> m.genre.name === selectedGenre.name): movieDetail
    let movies = paginate(filterList, currentPage, pageSize)
    
    if(filterList.length <= 0){
      return <p> There is no movies in database</p>
    } else {
      return(
        <div>
          <p>Show {filterList.length} results in the database</p>
          <table className = 'container'>
            {getHeadings()}
            {getMovies(movies)}
          </table>
        </div>
      ) 
    }
  }
  return ( 
    showMoviesList()
   );

}
 
export default MovieTable;