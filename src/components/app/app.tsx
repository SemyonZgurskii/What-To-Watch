import * as React from 'react';
import {connect} from 'react-redux';
import {Router, Switch, Route} from "react-router-dom";
import history from "../../history";
import {MoviesData, GlobalState} from '../../types';
import {getFilteredMovies, getGenres} from "../../reducer/data/selector";
import {getActiveGenre} from "../../reducer/app/selector";
import {ActionCreator} from "../../reducer/app/app";
import {AppRoute, Genre} from "../../constants";
import Main from "../main/main";
import BigVideoPlayer from "../big-video-player/big-video-player";

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
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            <Main
              moviesData={moviesData}
              genres={genres}
              activeGenre={activeGenre}
              setActiveGenre={setActiveGenre}
            />
          </Route>
          <Route exact path={AppRoute.PLAYER}>
            <BigVideoPlayer/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  return {
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
