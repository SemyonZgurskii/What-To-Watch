import * as React from 'react';
import MovieCard from "../movie-card/movie-card";
import {MoviesData} from '../../types';
import withSmallVideo from "../../hocs/with-small-video-player/with-small-video";

const MovieCardWrapped = withSmallVideo(MovieCard);

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
