import { REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_SUCESS } from "./Types.js";

const userContextReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCESS:
    case USER_LOGIN_SUCCESS:
    case USER_PROFILE_SUCCESS:
      newState = {
        ...state,
        loading: false,
        loggedUser: action.payload,
      }
      return newState

    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
    case USER_PROFILE_FAIL:
    case USER_LOGOUT_SUCCESS:
      newState = {
        ...state,
        loading: false,
        loggedUser: null,
      }
      return newState

    case USER_LOGOUT_FAIL:
      return state

    default:
      return state;
  }
};

export default userContextReducer;
