import * as React from 'react';
import GenreMenu from "../genre-menu/genre-menu";
import withShowMoreButton from "../../hocs/with-show-more-button/with-show-more-button";
import MoviesList from "../movies-list/movies-list";
import {Genre} from "../../constants";
import {Movie, MoviesData} from "../../types";
import Promo from "../promo/promo";
import MainHeader from "../main-header/main-header";

const MoviesListWrapped = withShowMoreButton<Movie>(MoviesList)

interface Props {
  moviesData: MoviesData;
  promoMovie: Movie,
  genres: Genre[],
  activeGenre: Genre,
  setActiveGenre: (Genre) => void,
}

function Main(props: Props): React.ReactElement {
  const {moviesData, activeGenre, genres, setActiveGenre, promoMovie} = props;

  return (
    <>
      {promoMovie &&
        <Promo promoMovie={promoMovie}>
          <MainHeader/>
        </Promo>
      }

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {moviesData &&
            <GenreMenu
              genres={genres}
              setActiveGenre={setActiveGenre}
              activeGenre={activeGenre}
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

export default Main;
