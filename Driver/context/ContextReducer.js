import { REQUEST, DRIVER_LOGIN_FAIL, DRIVER_LOGIN_SUCCESS, DRIVER_LOGOUT_FAIL, DRIVER_LOGOUT_SUCCESS, DRIVER_PROFILE_FAIL, DRIVER_PROFILE_SUCCESS, DRIVER_REGISTER_FAIL, DRIVER_REGISTER_SUCESS } from "./Types.js";

const driverContextReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case REQUEST:
      return { ...state, loading: true };

    case DRIVER_REGISTER_SUCESS:
    case DRIVER_LOGIN_SUCCESS:
    case DRIVER_PROFILE_SUCCESS:
      newState = {
        ...state,
        loading: false,
        loggedDriver: action.payload,
      }
      return newState

    case DRIVER_REGISTER_FAIL:
    case DRIVER_LOGIN_FAIL:
    case DRIVER_PROFILE_FAIL:
    case DRIVER_LOGOUT_SUCCESS:
      newState = {
        ...state,
        loading: false,
        loggedDriver: null,
      }
      return newState

    case DRIVER_LOGOUT_FAIL:
      return state

    default:
      return state;
  }
};

export default driverContextReducer;
