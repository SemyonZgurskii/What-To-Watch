import NameSpace from '../name-space';
import {Reviews, GlobalState, Movie, MoviesData} from "../../types";
import {Genre} from "../../constants";
import {createSelector} from "reselect";
import {getActiveGenre, getSelectedMovieId} from "../app/selector";

const NAME_SPACE = NameSpace.DATA;

export function getMoviesData(state: GlobalState): MoviesData {
  return state[NAME_SPACE].moviesData;
}

export function getRawPromoMovie(state: GlobalState): Movie {
  return state[NAME_SPACE].promoMovie;
}

export const getPromoMovie = createSelector(
  getRawPromoMovie,
  getUserMoviesList,
  (rawPromoMovie, userMoviesList) => {
    if (!userMoviesList || userMoviesList.length === 0) {
      return rawPromoMovie;
    }

    const indexInList = userMoviesList.findIndex(({id}) => id === rawPromoMovie.id);

    if (indexInList < 0) {
      return rawPromoMovie;
    }

    return userMoviesList[indexInList];
  }
)

export function getMovieReviews(state: GlobalState): Reviews {
  return state[NAME_SPACE].selectedMovieReviews;
}

export function getUserMoviesList(state: GlobalState): MoviesData {
  return state[NAME_SPACE].userMovies;
}

export const getSelectedMovie = createSelector(
  getMoviesData,
  getSelectedMovieId,
  getUserMoviesList,
  (moviesData, selectedMovieId, userMoviesList) => {

    if (!selectedMovieId) {
      return null;
    }

    const currentMovie = moviesData.find(({id}) => id === selectedMovieId);

    if (!userMoviesList || userMoviesList.length === 0) {
      return currentMovie;
    }

    const indexInList = userMoviesList.findIndex(({id}) => id === currentMovie.id);

    if (indexInList < 0) {
      return currentMovie;
    }

    return userMoviesList[indexInList];
  }
)

export const getSimilarMovies = createSelector(
  getMoviesData,
  getSelectedMovie,
  (moviesData, selectedMovie) => {
    if (moviesData === null || selectedMovie === null) {
      return null
    }

    return moviesData.filter(({genre, id}) => selectedMovie.genre === genre && selectedMovie.id !== id);
  }
)

export function getGenres(state: GlobalState): Genre[] | null {
  if (state[NAME_SPACE].moviesData === null) {
    return null;
  }

  const genres = state[NAME_SPACE].moviesData.map(({genre}) => genre);
  const uniqueGenres = [...new Set(genres)];

  return uniqueGenres;
}

export const getFilteredMovies = createSelector(
  getMoviesData,
  getActiveGenre,
  (moviesData, activeGenre) => {
    if (moviesData === null) {
      return null;
    }

    switch (activeGenre) {
      case Genre.AllGenres:
        return moviesData;
      default:
        return moviesData.filter((movie) => movie.genre === activeGenre);
    }
  }
)
