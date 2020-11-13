import {NameSpace} from '../namespaces';
import {MoviesData} from "../../types";

const NAME_SPACE: string = NameSpace.data;

export function getMoviesData(state: {}): MoviesData {
  return state[NAME_SPACE].moviesData;
}
