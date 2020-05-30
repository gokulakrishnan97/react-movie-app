import React, { Component } from 'react';
import { getMovies } from '.././services/fakeMovieService';
import { getGenres } from '.././services/fakeGenreService';
import Like from '../common/like';
import Pagination from '../common/pagination';
import paginate from '../util/paginate';
import FilterList from './listgroup';
import NavBar from '../util/navbar';
import { NavLink } from 'react-router-dom';
import MovieTable from './movie-table';

export default class Movie extends Component{
  state = {
    movieDetail: [],
    genres: [],
    titles: ['Title', 'Genre', 'Stock', 'Rental rate'],
    pageSize: 4,
    currentPage: 1,
    filterList: []
  };

  deleteMovie = (movie) =>{
    let movies = this.state.movieDetail.filter(m => m._id !== movie._id);
    this.setState({movieDetail: movies})
  }

  handleLike = (movie) => {
    let movies = [ ...this.state.movieDetail ];
    let index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movieDetail: movies })
  }

  pageHandler = (page) =>{
    this.setState({ currentPage: page})
  }

  filterResult = (genre) => {
    let movieList = [ ...this.state.movieDetail ];
    let movies = movieList.filter((movie) => movie.genre.name.toLowerCase() === genre.name.toLowerCase())
    return movies;
  }

  handleGenre = (genre) => {
    this.setState({ selectedGenre : genre, currentPage: 1});
  }

  render(){
    let { currentPage, pageSize, movieDetail, selectedGenre } = this.state;
    let filterList = selectedGenre && selectedGenre._id? 
      movieDetail.filter((m)=> m.genre.name === selectedGenre.name): movieDetail
    return(
      <div>
        <div className='container row m-4'>
          <div className='col-3'>
            <FilterList filterResult = {this.filterResult} genres = { this.state.genres } selectedGenre = {this.state.selectedGenre} selectGenre = {this.handleGenre}/>
          </div>
          <div className='col'>
            <MovieTable movies = {this.state} onDelete = {this.deleteMovie} onLike = {this.handleLike}/>
            <Pagination 
              currentPage = {currentPage}
              pageSize={pageSize} 
              itemsCount={filterList.length} 
              pageHandler = { this.pageHandler }/>
            </div>
          </div>
        </div> 
      );      
    }
    componentDidMount(){
      this.setState({ 
        movieDetail: getMovies(), 
        genres: getGenres(), 
      })
    }

    // componentDidUpdate(){
    //   this.setState({ movieDetail: getMovies()})
    // }
}

