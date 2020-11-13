import {MoviesData, ActionType} from "../../types";
// import {MoviesData, ActionType, Action, ActionCreator} from "../../types";

// type InitialState = {
//   moviesData: MoviesData | null
// }

const initialState = {
  moviesData: null as MoviesData | null,
}

type State = typeof initialState;

const ActionType: ActionType = {
  LOAD_MOVIES_DATA: `LOAD_MOVIES_DATA`
}

const ActionCreator = {
  loadMoviesData: (moviesData) => {
    return {
      type: ActionType.LOAD_MOVIES_DATA,
      payload: moviesData,
    } as const
  }
}

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;

type Action = ReturnType<PropertiesType<typeof ActionCreator>>
// :TODO типизировать Operation
const Operation = {
  loadMoviesData: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMoviesData(response.data));
      })
  }
}

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case (ActionType.LOAD_MOVIES_DATA):
      return Object.assign({}, state, {
        moviesData: action.payload,
      })
  }
}

export {reducer, Operation, ActionCreator};
