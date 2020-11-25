import * as React from 'react';
import {Movie} from "../../types";

interface Props {
  name: Movie["name"],
  handleMouseEnter: () => void,
  handleMouseOut: () => void,
}

function MovieCard(props: React.PropsWithChildren<Props>): React.ReactElement {
  const {name, handleMouseEnter, handleMouseOut} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image"
         onMouseEnter={handleMouseEnter}
         onMouseOut={handleMouseOut}
      >
        {props.children}
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default MovieCard;
