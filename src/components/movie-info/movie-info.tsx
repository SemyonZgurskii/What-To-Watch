import * as React from "react";
import {Movie, MoviesData} from "../../types";
import history from "../../history";
import {AppRoute} from "../../constants";
import MoreLikeThis from "../more-like-this/more-like-this";
import InfoDescription from "../info-description/info-description";
import {Link} from "react-router-dom";


interface Props {
  movieData: Movie,
  onPlayButtonClick: (id: Movie["id"]) => void
  moviesData: MoviesData,
}

function MovieInfo(props: Props) {
  const {movieData, onPlayButtonClick, moviesData} = props;
  const {
    backgroundImage,
    genre,
    name,
    posterImage,
    releaseDate,
    id,
  } = movieData;

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link href="#" className="logo__link"
                    to={AppRoute.MAIN}
              >
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </div>
          </header>

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
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
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
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>    </>
  )
}

export default MovieInfo;
