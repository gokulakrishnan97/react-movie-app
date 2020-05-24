import React, { Component } from 'react';
import { getMovies } from '.././services/fakeMovieService';
import Like from '../common/like';
export default class Movie extends Component{
    state = {
            movieDetail: getMovies(),
            titles: ['Title', 'Genre', 'Stock', 'Rental rate']
        };

    listStyle(){
        return(
            {
                'list-style-type': 'none'
            }
        )
    }
    getHeadings = ()=> {
        return (
                <thead>
                <tr>
                     {this.state.titles.map((title)=> <th className='m-4' style= {{ fontWeight: 'bold'}}> {title} </th>
                    ) }
                </tr>
                </thead>);
    };

    deleteMovie = (movie) =>{
        console.log(movie);
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
    getMovies = ()=> {
        let movie = this.state.movieDetail.map((movie)=>{
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
        if(this.state.movieDetail.length <= 0){
            return <p> There is no movies in database</p>
        } else {
           return(
               <div>
                <p>Show {this.state.movieDetail.length} results in the database</p>
                <table className = 'container'>
                    {this.getHeadings()}
                    {this.getMovies()}
                </table>
               </div>
           ) 
        }
    }
    render(){
        return(
             <div>
                { this.showMoviesList()}
             </div> );
            
    }
}

