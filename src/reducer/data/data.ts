import {MoviesData, ActionType} from "../../types";
import {convertData} from "../../adapter/data";
import {Dispatch} from "redux";
import {AxiosInstance} from "axios";

type State = typeof initialState;
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
type Action = ReturnType<PropertiesType<typeof ActionCreator>>

const initialState = {
  moviesData: null as MoviesData | null,
}

const ActionType: ActionType = {
  LOAD_MOVIES_DATA: `LOAD_MOVIES_DATA`
}

const ActionCreator = {
  loadMoviesData: (moviesData: MoviesData) => {
    return {
      type: ActionType.LOAD_MOVIES_DATA,
      payload: moviesData,
    } as const
  }
}

// :TODO типизировать Operation
const Operation = {
  loadMoviesData: () => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMoviesData(response.data.map(convertData)));
      })
  }
}

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionType.LOAD_MOVIES_DATA:
      return Object.assign({}, state, {
        moviesData: action.payload,
      });
  }

  return state;
}

export interface Type {
  STATE: State,
}

export {reducer, Operation, ActionCreator};
