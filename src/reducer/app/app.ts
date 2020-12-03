import {Genre} from "../../constants";
import {ActionType} from "../../types";

interface State {
  activeGenre: Genre,
}

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
type Action = ReturnType<PropertiesType<typeof ActionCreator>>

const initialState: State = {
  activeGenre: Genre.AllGenres,
}

const ActionType: ActionType = {
  SET_ACTIVE_GENRE: "SET_ACTIVE_GENRE",
}

const ActionCreator = {
  setActiveGenre: (genre: Genre) => {
    return {
      type: ActionType.SET_ACTIVE_GENRE,
      payload: genre,
    } as const
  }
}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.SET_ACTIVE_GENRE:
      return Object.assign({}, state, {
          activeGenre: action.payload,
        })
    default:
      return state;
  }
}

export interface Type {
  STATE: State,
}

export {reducer, ActionCreator};
