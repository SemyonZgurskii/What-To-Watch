import * as React from "react";
import MoviesList from "../movies-list/movies-list";
import {MoviesData} from "../../types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants";

interface Props {
  moviesData: MoviesData;
}

function MyList(props: Props) {
  const {moviesData} = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link href="#" className="logo__link"
                to={AppRoute.MAIN}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList processedData={moviesData}/>

      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link href="#" className="logo__link logo__link--light"
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
    </div>
  )
}

export default MyList;