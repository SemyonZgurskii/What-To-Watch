import * as React from 'react';
import {connect} from 'react-redux';
import {Router, Switch, Route} from "react-router-dom";
import history from "../../history";
import {MoviesData, GlobalState, Movie} from '../../types';
import {getFilteredMovies, getGenres, getPromoMovie, getSelectedMovie} from "../../reducer/data/selector";
import {getActiveGenre} from "../../reducer/app/selector";
import {ActionCreator} from "../../reducer/app/app";
import {AppRoute, Genre} from "../../constants";
import Main from "../main/main";
import BigVideoPlayer from "../big-video-player/big-video-player";
import withBigVideo from "../../hocs/with-big-video-player/with-big-video";
import MovieInfo from "../movie-info/movie-info";

const BigVideoPlayerWrapped = withBigVideo(BigVideoPlayer);

interface Props {
  promoMovie: Movie,
  moviesData: MoviesData;
  genres: Genre[],
  activeGenre: Genre,
  setActiveGenre: (Genre) => void,
  selectedMovie: Movie,
}

class App extends React.PureComponent<Props, {}> {
  static defaultProps = {moviesData: null};


  render() {
    const {moviesData, activeGenre, genres, setActiveGenre, promoMovie, selectedMovie} = this.props;
    const promo = promoMovie ? promoMovie : null;
    console.log(selectedMovie);

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            <Main
              promoMovie={promo}
              moviesData={moviesData}
              genres={genres}
              activeGenre={activeGenre}
              setActiveGenre={setActiveGenre}
            />
          </Route>
          <Route exact path={AppRoute.PLAYER}>
            <BigVideoPlayerWrapped
              movieData={selectedMovie}
            />
          </Route>
          <Route exact path={AppRoute.MOVIE_INFO}>
            <MovieInfo
              movieData={selectedMovie}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  return {
    promoMovie: getPromoMovie(state),
    moviesData: getFilteredMovies(state),
    activeGenre: getActiveGenre(state),
    genres: getGenres(state),
    selectedMovie: getSelectedMovie(state),
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
