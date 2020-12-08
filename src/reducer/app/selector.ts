import NameSpace from "../name-space";
import {Genre} from "../../constants";
import {GlobalState, Movie} from "../../types";

const NAME_SPACE = NameSpace.APP;

export function getActiveGenre(state: GlobalState): Genre {
  return state[NAME_SPACE].activeGenre;
}

export function getSelectedMovieId(state: GlobalState): Movie["id"] {
  return state[NAME_SPACE].selectedMovieId
}
