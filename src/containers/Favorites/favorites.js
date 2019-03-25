import React, { Component } from 'react';
import Movie from '../../components/Movie';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Favorites extends Component{
  filterMovies = () => {
    let favoritesArray = [];
    this.props.favorites.forEach(favorite => {
       this.props.movies.forEach(movie => {
         if(movie.id === favorite) {
           favoritesArray.push(movie)
         }
      })
    })
    return this.renderMovies(favoritesArray)
  }

  renderMovies = (movies) => {
    return movies.map(movie => {
      return (
        <Link to={`/movies/${movie.id}`} key={movie.id} >
          <Movie  
            {...movie}
          />
        </Link>
      )
    })
  }

  render() {
    return (
      <div className="movie-container">
        {this.filterMovies()}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  favorites: state.favorites
})

export default connect(mapStateToProps)(Favorites)