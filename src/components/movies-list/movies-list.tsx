import * as React from 'react';
import MovieCard from "../movie-card/movie-card";
import {MoviesData} from '../../types';

interface Props {
  moviesData: MoviesData,
}

function MoviesList(props: Props) {
  const {moviesData} = props;

  return (
    <div className="catalog__movies-list">
      {moviesData.map((movieData) => {
        const {previewImage, name, id} = movieData;

        return (
          <MovieCard
            key={id}
            previewImage={previewImage}
            name={name}
          />
        )
      })}
    </div>
  )
}

export default MoviesList;
