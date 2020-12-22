import * as React from "react";
import {Movie, MoviesData} from "../../types";
import history from "../../history";
import {AppRoute} from "../../constants";
import MoreLikeThis from "../more-like-this/more-like-this";
import InfoDescription from "../info-description/info-description";
import {Link} from "react-router-dom";
import MainHeader from "../main-header/main-header";
import MyListButton from "../my-list-button/my-list-button";

interface Props {
  movieData: Movie,
  onPlayButtonClick: (id: Movie["id"]) => void
  moviesData: MoviesData,
  changeIsFavoriteStatus: (id: Movie["id"], status: Movie["isFavorite"]) => void,
}

function MovieInfo(props: Props) {
  const {movieData, onPlayButtonClick, moviesData, changeIsFavoriteStatus} = props;
  const {
    backgroundImage,
    genre,
    name,
    posterImage,
    releaseDate,
    id,
    isFavorite
  } = movieData;

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <MainHeader/>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button"
                        onClick={() => {
                          onPlayButtonClick(id);
                          history.push(AppRoute.PLAYER);
                        }}
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

                <Link href="add-review.html" className="btn movie-card__button"
                      to={AppRoute.ADD_REVIEW}
                >Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327"/>
            </div>

            <InfoDescription
              movieData={movieData}
            />

          </div>
        </div>
      </section>

      <div className="page-content">

        {moviesData.length > 1 &&
          <MoreLikeThis
            moviesData={moviesData}
          />
        }

        <footer className="page-footer">
          <div className="logo">
            <Link href="main.html" className="logo__link logo__link--light"
                  to={AppRoute.MAIN}
            >
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>    </>
  )
}

export default MovieInfo;
