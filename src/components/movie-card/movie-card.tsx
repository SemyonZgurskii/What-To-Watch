import * as React from 'react';
import {Movie} from "../../types";

type Props = {
  previewImage: Movie["previewImage"],
  name: Movie["name"],
}

function MovieCard(props: Props) {
  const {previewImage, name} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={previewImage} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default MovieCard;
