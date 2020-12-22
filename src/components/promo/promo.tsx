import * as React from "react";
import history from "../../history";
import {AppRoute} from "../../constants";
import {Movie} from "../../types";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {Operation as DataOperation} from "../../reducer/data/data";
import {connect} from "react-redux";
import MyListButton from "../my-list-button/my-list-button";

interface Props {
  promoMovie: Movie,
  children: React.ReactNode,
  onPlayButtonClick: (id: Movie["id"]) => void,
  changeIsFavoriteStatus: (id: Movie["id"], status: Movie["isFavorite"]) => void,
}

function Promo(props: Props) {
  const {promoMovie, children, onPlayButtonClick, changeIsFavoriteStatus} = props;
  const {posterImage, releaseDate, genre, name, backgroundImage, id, isFavorite} = promoMovie;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      {children}

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={posterImage} alt={`${name} poster`} width="218"
                 height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{releaseDate}</span>
            </p>

            <div className="movie-card__buttons">
              <button
                onClick={() => {
                  onPlayButtonClick(id);
                  history.push(AppRoute.PLAYER)}
                }
                className="btn btn--play movie-card__button"
                type="button"
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <MyListButton
                isFavorite={isFavorite}
                onButtonClick={() => changeIsFavoriteStatus(id, isFavorite)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onPlayButtonClick(id) {dispatch(AppActionCreator.setSelectedMovieId(id))},
    changeIsFavoriteStatus(id, action) {dispatch(DataOperation.updateUserMovies(id, action))},
  }
}

export default connect(null, mapDispatchToProps)(Promo);
