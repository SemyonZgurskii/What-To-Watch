import NameSpace from "../name-space";
import {GlobalState} from "../../types";

const NAME_SPACE = NameSpace.USER;

export function getAuthorizationStatus(state: GlobalState) {
  return state[NAME_SPACE].authorizationStatus;
}
