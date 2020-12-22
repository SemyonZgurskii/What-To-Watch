const AuthorizationStatus = {
  AUTH: "AUTH",
  NO_AUTH: "NO_AUTH",
} as const

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
type Action = ReturnType<PropertiesType<typeof ActionCreator>>

export interface State {
  authorizationStatus: typeof AuthorizationStatus,
}

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
}

enum ActionType {
  REQUIRE_AUTHORIZATION = "REQUIRE AUTHORIZATION",
}

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status,
    } as const
  },
}

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get("/login")
      .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
      .catch((error) => {throw error});
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post("/login", {
      email: authData.email,
      password: authData.password,
    })
      .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
      .catch((error) => {throw error})
  }
}

function reducer(state = initialState, action: Action) {
  switch(action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return {...state, authorizationStatus: action.payload}
    default:
      return state;
  }
}

export {reducer, Operation, AuthorizationStatus};
