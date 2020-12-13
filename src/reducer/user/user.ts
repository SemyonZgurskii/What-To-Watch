const AuthorizationStatus = {
  AUTH: "AUTH",
  NO_AUTH: "NO_AUTH",
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
    }
  }
}

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get("/login")
      .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
      .catch((error) => {throw error});
  }
}

function reducer(state, action) {
  switch(action) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return {...state, authorizationStatus: action.payload}
    default:
      return state;
  }
}

export {reducer, Operation};
