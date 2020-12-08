import {Genre} from "../../constants";
import {Movie} from "../../types";

export interface State {
  activeGenre: Genre,
  selectedMovieId: Movie["id"] | null,
}

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
type Action = ReturnType<PropertiesType<typeof ActionCreator>>

const initialState: State = {
  activeGenre: Genre.AllGenres,
  selectedMovieId: null,
}

enum ActionType {
  SET_ACTIVE_GENRE = "SET_ACTIVE_GENRE",
  SET_SELECTED_MOVIE_ID = "SET_SELECTED_MOVIE_ID",
}

const ActionCreator = {
  setActiveGenre: (genre: Genre) => {
    return {
      type: ActionType.SET_ACTIVE_GENRE,
      payload: genre,
    } as const
  },

  setSelectedMovieId: (id: Movie["id"]) => {
    return {
      type: ActionType.SET_SELECTED_MOVIE_ID,
      payload: id,
    } as const
  }
}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.SET_ACTIVE_GENRE:
      return {...state, activeGenre: action.payload}
    case ActionType.SET_SELECTED_MOVIE_ID:
      return {...state, selectedMovieId: action.payload}
    default:
      return state;
  }
}

export {reducer, ActionCreator};
