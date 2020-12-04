import {MoviesData, Movie} from "../../types";
import {convertData} from "../../adapter/data";
import {Dispatch} from "redux";
import {AxiosInstance} from "axios";

export interface State {
  moviesData: MoviesData | null,
  promoMovie: Movie,
}

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
type Action = ReturnType<PropertiesType<typeof ActionCreator>>

const initialState: State = {
  moviesData: null,
  promoMovie: null
}

enum ActionType {
  LOAD_MOVIES_DATA = "LOAD_MOVIES_DATA",
  LOAD_PROMO_MOVIE = "LOAD_PROMO_MOVIE",
}

const ActionCreator = {
  setMoviesData: (moviesData: MoviesData) => {
    return {
      type: ActionType.LOAD_MOVIES_DATA,
      payload: moviesData,
    } as const
  },
  setPromoMovie: (movie: Movie) => {
    return{
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    } as const
  }
}

const Operation = {
  loadMoviesData: () => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    return api.get("/films")
      .then((response) => {
        dispatch(ActionCreator.setMoviesData(response.data.map(convertData)));
      })
  },
  loadPromoMovie: () => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    return api.get("/films/promo")
      .then((response) => {
        dispatch(ActionCreator.setPromoMovie(convertData(response.data)));
      })
  }
}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.LOAD_MOVIES_DATA:
      return {...state, moviesData: action.payload};
    case ActionType.LOAD_PROMO_MOVIE:
      return {...state, promoMovie: action.payload}
    default:
      return state;
  }
}

export {reducer, Operation, ActionCreator};
