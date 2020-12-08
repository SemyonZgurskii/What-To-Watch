import * as React from 'react';
import {Movie} from "../../types";
import history from "../../history";
import {AppRoute} from "../../constants";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app";

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
         onClick={() => {
           onMovieCardClick(id);
           history.push(AppRoute.MOVIE_INFO);
         }}
      >
        {props.children}
      </div>
      <h3 className="small-movie-card__title"
          onClick={() => {
            onMovieCardClick(id);
            history.push(AppRoute.MOVIE_INFO);
          }}
      >
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onMovieCardClick(id) {
      dispatch(ActionCreator.setSelectedMovieId(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(MovieCard);
