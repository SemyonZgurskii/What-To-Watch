import NameSpace from '../name-space';
import {MoviesData} from "../../types";
import {Type} from "./data";

const NAME_SPACE: string = NameSpace.DATA;

export function getMoviesData(state: Type["STATE"]): MoviesData {
  return state[NAME_SPACE].moviesData;
}
