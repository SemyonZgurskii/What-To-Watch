import * as React from "react";
import {Movie} from "../../types";

function formatTime(time: number): string {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
}

interface Props {
  director: Movie["director"],
  starring: Movie["starring"],
  runTime: Movie["runTime"],
  genre: Movie["genre"],
  releaseDate: Movie["releaseDate"],
}

function Details(props: Props) {
  const {starring, director, genre, releaseDate, runTime} = props;
  const formatRunTime = formatTime(runTime);

  return (
    <>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">

              {starring.map((star, index) => {
                return index < starring.length - 1 ? `${star} \n` : star;
              })}

            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{formatRunTime}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{releaseDate}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Details;
