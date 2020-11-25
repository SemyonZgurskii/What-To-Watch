import * as React from 'react';
import MovieCard from "../movie-card/movie-card";
import {MoviesData} from '../../types';
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";

const MovieCardWrapped = withVideoPlayer(MovieCard);

interface Props {
  moviesData: MoviesData,
}

function MoviesList(props: Props) {
  const {moviesData} = props;

  return (
    <div className="catalog__movies-list">
      {moviesData.map((movieData) => {
        const {previewImage, name, id, previewVideoLink} = movieData;

        return (
          <MovieCardWrapped
            key={id}
            previewImage={previewImage}
            previewVideoLink={previewVideoLink}
            name={name}
          />
        )
      })}
    </div>
  )
}

export default MoviesList;
