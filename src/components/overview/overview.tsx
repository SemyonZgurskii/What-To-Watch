import * as React from "react";
import {Movie} from "../../types";

function getVerbalRating(rating: number): string {
  const verbalRating = rating >= 8 ? "Very good" :
    5 <= rating && rating < 8 ? "Good" :
      3 <= rating && rating < 5 ? "Normal" : "Bad"

  return verbalRating;
}

interface Props {
  rating: Movie["rating"],
  scoreCount: Movie["scoreCount"],
  description: Movie["description"],
  director: Movie["director"],
  starring: Movie["starring"],
}

function Overview(props: Props) {
  const {description, director, rating, scoreCount, starring} = props;
  const verbalRating = getVerbalRating(rating);

  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{verbalRating}</span>
          <span className="movie-rating__count">{`${scoreCount} ratings`}</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}</strong></p>
      </div>
    </>
  )
}

export default Overview;
