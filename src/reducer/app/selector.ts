import NameSpace from "../name-space";
import {Genre} from "../../constants";
import {GlobalState} from "../../types";

const NAME_SPACE = NameSpace.APP;

export function getActiveGenre(state: GlobalState): Genre {
  return state[NAME_SPACE].activeGenre;
}
