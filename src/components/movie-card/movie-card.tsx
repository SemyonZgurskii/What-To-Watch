import * as React from 'react';
import {Movie} from "../../types";

interface Props {
  name: Movie["name"],
  onMouseEnter: () => void,
  onMouseOut: () => void,
  children: React.ReactNode,
  id: Movie["id"];
  onMovieCardClick: (id: this["id"]) => void;
}

function MovieCard(props: Props): React.ReactElement {
  const {name, onMouseEnter, onMouseOut, id, onMovieCardClick} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image"
         onMouseEnter={onMouseEnter}
         onMouseOut={onMouseOut}
         onClick={() => onMovieCardClick(id)}
      >
        {props.children}
      </div>
      <h3 className="small-movie-card__title"
        onClick={() => onMovieCardClick(id)}
      >
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default MovieCard;
