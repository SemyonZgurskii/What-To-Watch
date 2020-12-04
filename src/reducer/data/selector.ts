import NameSpace from '../name-space';
import {GlobalState, MoviesData} from "../../types";
import {Genre} from "../../constants";
import {createSelector} from "reselect";
import {getActiveGenre} from "../app/selector";

const NAME_SPACE: string = NameSpace.DATA;

export function getMoviesData(state: GlobalState): MoviesData {
  return state[NAME_SPACE].moviesData;
}

export function getGenres(state: GlobalState): Genre[] | null {
  if (state[NameSpace.DATA].moviesData === null) {
    return null;
  }

  const genres = state[NameSpace.DATA].moviesData.map(({genre}) => genre);
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
