import * as React from 'react';
import {connect} from 'react-redux';
import {Router, Switch, Route} from "react-router-dom";
import history from "../../history";
import {MoviesData, GlobalState, Movie} from '../../types';
import {getFilteredMovies, getGenres, getPromoMovie} from "../../reducer/data/selector";
import {getActiveGenre} from "../../reducer/app/selector";
import {ActionCreator} from "../../reducer/app/app";
import {AppRoute, Genre} from "../../constants";
import Main from "../main/main";
import BigVideoPlayer from "../big-video-player/big-video-player";
import withBigVideo from "../../hocs/with-big-video-player/with-big-video";

const BigVideoPlayerWrapped = withBigVideo(BigVideoPlayer);

interface Props {
  promoMovie: Movie,
  moviesData: MoviesData;
  genres: Genre[],
  activeGenre: Genre,
  setActiveGenre: (Genre) => void,
}

class App extends React.PureComponent<Props, {}> {
  static defaultProps = {moviesData: null};


  render() {
    const {moviesData, activeGenre, genres, setActiveGenre, promoMovie} = this.props;
    const promo = promoMovie ? promoMovie : null;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            <Main
              promoMovie={promoMovie}
              moviesData={moviesData}
              genres={genres}
              activeGenre={activeGenre}
              setActiveGenre={setActiveGenre}
            />
          </Route>
          <Route exact path={AppRoute.PLAYER}>
            <BigVideoPlayerWrapped
              movieData={promo}
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
