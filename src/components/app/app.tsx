import * as React from 'react';
import {connect} from 'react-redux';
import {Router, Switch, Route} from "react-router-dom";
import history from "../../history";
import {MoviesData, GlobalState, Movie, PostReviewData} from '../../types';
import {getFilteredMovies, getGenres, getPromoMovie, getSelectedMovie, getSimilarMovies, getUserMoviesList} from "../../reducer/data/selector";
import {getActiveGenre} from "../../reducer/app/selector";
import {ActionCreator} from "../../reducer/app/app";
import {AppRoute, Genre} from "../../constants";
import Main from "../main/main";
import BigVideoPlayer from "../big-video-player/big-video-player";
import withBigVideo from "../../hocs/with-big-video-player/with-big-video";
import MovieInfo from "../movie-info/movie-info";
import SignIn from "../sign-in/sign-in";
import {Operation as userOperation} from "../../reducer/user/user";
import {Operation as DataOperation, Operation as dataOperation} from "../../reducer/data/data";
import AddReview from "../add-review/add-review";
import MyList from "../my-list/my-list";
import {getAuthorizationStatus} from "../../reducer/user/selector";

const BigVideoPlayerWrapped = withBigVideo(BigVideoPlayer);

interface Props {
  promoMovie: Movie,
  moviesData: MoviesData;
  genres: Genre[],
  activeGenre: Genre,
  setActiveGenre: (Genre) => void,
  selectedMovie: Movie,
  setSelectedMovieId: (id: Movie["id"]) => void,
  similarMovies: MoviesData,
  login: ({email, password}: {email: string, password: string}) => void,
  updateMovieReviews: (movieId: number, review: PostReviewData) => void,
  userMoviesData: MoviesData,
  authorizationStatus: string,
  loadUserMovies: () => void,
  changeIsFavoriteStatus: (id: Movie["id"], status: Movie["isFavorite"]) => void,
}

class App extends React.PureComponent<Props, {}> {
  static defaultProps = {moviesData: null};

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
    if (prevProps.authorizationStatus !== this.props.authorizationStatus) {
      this.props.loadUserMovies();
    }
  }

  render() {
    const {
      moviesData,
      activeGenre,
      genres,
      setActiveGenre,
      promoMovie,
      selectedMovie,
      setSelectedMovieId,
      similarMovies,
      login,
      updateMovieReviews,
      userMoviesData,
      changeIsFavoriteStatus,
    } = this.props;
    const promo = promoMovie ? promoMovie : null;

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
              moviesData={similarMovies}
              movieData={selectedMovie}
              onPlayButtonClick={setSelectedMovieId}
              changeIsFavoriteStatus={changeIsFavoriteStatus}
            />
          </Route>
          <Route exart path={AppRoute.SIGN_IN}>
            <SignIn
              login={login}
            />
          </Route>
          <Route exart path={AppRoute.ADD_REVIEW}>
            <AddReview
              movieData={selectedMovie}
              postReview={updateMovieReviews}
            />
          </Route>
          <Route exart path={AppRoute.MY_LIST}>
            <MyList moviesData={userMoviesData}/>
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
    similarMovies: getSimilarMovies(state),
    userMoviesData: getUserMoviesList(state),
    authorizationStatus: getAuthorizationStatus(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveGenre(genre) {dispatch(ActionCreator.setActiveGenre(genre))},
    setSelectedMovieId(id) {dispatch(ActionCreator.setSelectedMovieId(id))},
    login(authData) {dispatch(userOperation.login(authData))},
    updateMovieReviews(id, reviewData) {dispatch(dataOperation.updateMovieReviews(id, reviewData))},
    loadUserMovies() {dispatch(dataOperation.loadUserMovies())},
    changeIsFavoriteStatus(id, action) {dispatch(DataOperation.updateUserMovies(id, action))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
