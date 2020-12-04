import * as React from 'react';
import MoviesList from "../movies-list/movies-list";
import withShowMoreButton from "../../hocs/with-show-more-button/with-show-more-button";
import {MoviesData, GlobalState, Movie} from '../../types';
import {connect} from 'react-redux';
import {getGenres, getMoviesData} from "../../reducer/data/selector";
import {getActiveGenre} from "../../reducer/app/selector";
import {ActionCreator} from "../../reducer/app/app";
import GenreMenu from "../genre-menu/genre-menu";
import {Genre} from "../../constants";

const MoviesListWrapped = withShowMoreButton<Movie>(MoviesList)

interface Props {
  moviesData: MoviesData;
  genres: Genre[],
  activeGenre: Genre,
  setActiveGenre: (Genre) => void,
}

class App extends React.PureComponent<Props, {}> {
  static defaultProps = {moviesData: null};

  render() {
    const {moviesData, activeGenre, genres, setActiveGenre} = this.props;

    return (
      <>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218"
                     height="327"/>
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">Drama</span>
                  <span className="movie-card__year">2014</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            {moviesData &&
              <GenreMenu
                genres={genres}
                setActiveGenre={setActiveGenre}
                // activeGenre={activeGenre}
              />
            }

            {moviesData &&
              <MoviesListWrapped basicData={moviesData}/>
            }

          </section>


          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  return {
    moviesData: getMoviesData(state),
    activeGenre: getActiveGenre(state),
    genres: getGenres(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveGenre(genre) {
      dispatch(ActionCreator.setActiveGenre(genre));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
