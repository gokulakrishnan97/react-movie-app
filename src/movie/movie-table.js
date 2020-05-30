import React from 'react';
import { NavLink } from 'react-router-dom';
import Like from '../common/like';
import paginate from '../util/paginate';
import _ from 'lodash';


const MovieTable = (props) => {
  let { movieDetail, currentPage, pageSize, selectedGenre, titles, sort} = props.movies;
  const getHeadings = ()=> {
    return (
      <thead>
        <tr>
         <th  onClick = {() => props.onSort('title')} className='m-4' style= {{ fontWeight: 'bold'}}> Title </th>
         <th  onClick = {() => props.onSort('genre.name')} className='m-4' style= {{ fontWeight: 'bold'}}> Genre </th>
         <th  onClick = {() => props.onSort('numberInStock')} className='m-4' style= {{ fontWeight: 'bold'}}> Stock </th>
         <th  onClick = {() => props.onSort('dailyRentalRate')} className='m-4' style= {{ fontWeight: 'bold'}}> Rental rate </th>
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
    let sortedList = _.orderBy(filterList, sort.sortItem, sort.order)
    let movies = paginate(sortedList, currentPage, pageSize)
    
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