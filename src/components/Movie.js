import React from 'react';

export class Movie extends Component {
  render() {
    const { title, rating, posterImage, synopsis } = this.props
    return (
      <div className="movie">
        <div class="movie-info">
        {title}
        {rating}
        {synopsis}
        </div>
        {/* <h4 className="movie-title">{title}</h4> */}
        {/* <p classsName="rating">{rating}</p> */}
        <img src={posterImage} alt='movie poster'/>
      </div>
    )
  }
  
const Movie = ({ title, rating, posterImage }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{rating}</p>
      <img src={posterImage} alt='movie poster'/>
    </div>
  )
}

export default Movie
