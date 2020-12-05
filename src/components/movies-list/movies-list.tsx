import * as React from 'react';
import MovieCard from "../movie-card/movie-card";
import {MoviesData} from '../../types';
import withSmallVideoPlayer from "../../hocs/with-small-video-player/with-small-video-player";

const MovieCardWrapped = withSmallVideoPlayer(MovieCard);

interface Props {
  processedData: MoviesData,
  children?: React.ReactNode,
}

function MoviesList(props: Props): React.ReactElement {
  const {processedData, children} = props;

  return (
    <>
      <div className="catalog__movies-list">
        {processedData.map((movieData) => {
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
      {children}
    </>
  )
}

export default MoviesList;
