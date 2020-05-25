import React, { Component } from 'react';
import { getMovies } from '.././services/fakeMovieService';
import Like from '../common/like';
import Pagination from '../common/pagination';
import paginate from '../util/paginate';
export default class Movie extends Component{
    state = {
        movieDetail: getMovies(),
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
      let { movieDetail, currentPage, pageSize} = this.state;
        if(this.state.movieDetail.length <= 0){
            return <p> There is no movies in database</p>
        } else {
          let movies = paginate(movieDetail, currentPage, pageSize)
           return(
               <div>
                <p>Show {movies.length} results in the database</p>
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
    render(){
        let { currentPage, pageSize, movieDetail } = this.state;
        return(
             <div>
                { this.showMoviesList()}
                <Pagination 
                  currentPage = {currentPage}
                  pageSize={pageSize} 
                  itemsCount={movieDetail.length} 
                  pageHandler = { this.pageHandler }/>
             </div> );
            
    }
}

