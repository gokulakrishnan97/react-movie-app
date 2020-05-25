import React, { Component } from 'react';
import { getMovies } from '.././services/fakeMovieService';
import { getGenres } from '.././services/fakeGenreService';
import Like from '../common/like';
import Pagination from '../common/pagination';
import paginate from '../util/paginate';
import FilterList from './listgroup';
export default class Movie extends Component{
    state = {
        movieDetail: [],
        genres: [],
        titles: ['Title', 'Genre', 'Stock', 'Rental rate'],
        pageSize: 4,
        currentPage: 1
    };
    getHeadings = ()=> {
        return (
            <thead>
                <tr>
                    {this.state.titles.map((title)=> <th key = {title} className='m-4' style= {{ fontWeight: 'bold'}}> {title} </th>)}
                </tr>
            </thead>
        );
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
    getMovies = (movies)=> {
      let movie = movies.map((movie)=>{
        return (
          <tbody>
            <tr>
              <td>{ movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td> <Like onClick={this.handleLike} liked={movie.liked} movie={movie}/> </td>
              <td><button className='btn btn-danger' onClick= { () => this.deleteMovie(movie) }>delete</button></td>
            </tr>
          </tbody>
        )
      });
      return movie;
    }
    
    showMoviesList = () =>{
      let { movieDetail, currentPage, pageSize, selectedGenre} = this.state;
        if(this.state.movieDetail.length <= 0){
            return <p> There is no movies in database</p>
        } else {
          console.log('---------');
          console.log(selectedGenre);
          let filterList = selectedGenre && selectedGenre._id? 
            movieDetail.filter((m)=> m.genre.name === selectedGenre.name):
            movieDetail
          let movies = paginate(filterList, currentPage, pageSize)
           return(
               <div>
                <p>Show {movieDetail.length} results in the database</p>
                <table className = 'container'>
                    {this.getHeadings()}
                    {this.getMovies(movies)}
                </table>
               </div>
           ) 
        }
    }

    pageHandler = (page) =>{
      this.setState({ currentPage: page})
    }

    filterResult = (genre) => {
      console.log('function called');
      let movieList = [ ...this.state.movieDetail ];
      let movies = movieList.filter((movie) => movie.genre.name.toLowerCase() === genre.name.toLowerCase())
      console.log(movies);
      return movies;
      //this.setState({ filteredResult: movies});
    }
    // getFilters = () =>{
    //   return(
    //     <ul className="list-group">
    //     <li className="list-group-item">All Genres</li>
    //     {
    //       genres.map( g => <li className="list-group-item" onClick= {()=>this.filterResult(g)}>{ g.name }</li>)
    //     }
    //     </ul>
    //   )
    // }

    handleGenre = (genre) => {
      console.log(genre);
      this.setState({ selectedGenre : genre, currentPage: 1});
    }

    render(){
      console.log(this.state);
      let { currentPage, pageSize, movieDetail } = this.state;
      return(
        <div className='container row m-4'>
          <div className='col-3'>
            <FilterList filterResult = {this.filterResult} genres = { this.state.genres } selectedGenre = {this.state.selectedGenre} selectGenre = {this.handleGenre}/>
          </div>
          <div className='col'>
            { this.showMoviesList() }
            <Pagination 
              currentPage = {currentPage}
              pageSize={pageSize} 
              itemsCount={movieDetail.length} 
              pageHandler = { this.pageHandler }/>
          </div>
        </div> 
      );      
    }
    componentDidMount(){
      console.log('mounted')
      this.setState({ 
        movieDetail: getMovies(), 
        genres: getGenres(), 
       // filteredResult: getMovies()
      })
    }

    // componentDidUpdate(){
    //   this.setState({ movieDetail: getMovies()})
    // }
}

