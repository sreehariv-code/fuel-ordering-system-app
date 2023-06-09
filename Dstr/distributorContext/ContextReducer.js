import { REQUEST, DISTRIBUTOR_LOGIN_FAIL, DISTRIBUTOR_LOGIN_SUCCESS, DISTRIBUTOR_LOGOUT_FAIL, DISTRIBUTOR_LOGOUT_SUCCESS, DISTRIBUTOR_PROFILE_FAIL, DISTRIBUTOR_PROFILE_SUCCESS, DISTRIBUTOR_REGISTER_FAIL, DISTRIBUTOR_REGISTER_SUCESS } from "./Types.js";

const distributorContextReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case REQUEST:
      return { ...state, loading: true };

    case DISTRIBUTOR_REGISTER_SUCESS:
    case DISTRIBUTOR_LOGIN_SUCCESS:
    case DISTRIBUTOR_PROFILE_SUCCESS:
      newState = {
        ...state,
        loading: false,
        loggedDistributor: action.payload,
      }
      return newState

    case DISTRIBUTOR_REGISTER_FAIL:
    case DISTRIBUTOR_LOGIN_FAIL:
    case DISTRIBUTOR_PROFILE_FAIL:
    case DISTRIBUTOR_LOGOUT_SUCCESS:
      newState = {
        ...state,
        loading: false,
        loggedDistributor: null,
      }
      return newState

    case DISTRIBUTOR_LOGOUT_FAIL:
      return state

    default:
      return state;
  }
};

export default distributorContextReducer;
