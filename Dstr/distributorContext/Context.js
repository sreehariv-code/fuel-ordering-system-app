import axios from "axios";
import { Platform } from "react-native";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import distributorContextReducer from "./ContextReducer";
import {
  REQUEST,
  DISTRIBUTOR_REGISTER_SUCESS,
  DISTRIBUTOR_REGISTER_FAIL,
  DISTRIBUTOR_LOGIN_SUCCESS,
  DISTRIBUTOR_LOGIN_FAIL,
  DISTRIBUTOR_PROFILE_SUCCESS,
  DISTRIBUTOR_PROFILE_FAIL,
  DISTRIBUTOR_LOGOUT_SUCCESS,
  DISTRIBUTOR_LOGOUT_FAIL,
} from "./Types.js";
import Constants from "expo-constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { manifest } = Constants;

const androidUrl = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:3000/api/`;
const iosUrl = `http://localhost:3000/api/`;
let baseURL, distributorUrl;
if (Platform.OS === "android") {
  baseURL = androidUrl + "users";
  distributorUrl = androidUrl + "distributors";
  orderUrl = androidUrl + "orders";
} else {
  baseURL = iosUrl + "users";
  distributorUrl = iosUrl + "distributors";
  orderUrl = iosUrl + "orders";
}

const initialState = {
  loading: false,
  loggedDistributor: null,
  error: null,
};

export const DistributorContext = createContext(initialState);

const DistributorContextProvider = ({ children }) => {
    const [distributorState, dispatch] = useReducer(distributorContextReducer, initialState);
    const [orderList, setOrderList] = useState([]);
    let [token, setToken] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const distributorConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@token");
        setToken(value);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const getDistributors = async () => {
    try {
      dispatch({
        type: REQUEST,
      });
      const distributors = await axios.get(`${distributorUrl}`, config);
      console.log(distributors.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loginDistributor = async (email, password) => {
    try {
      dispatch({ type: REQUEST });
      const res = await axios.post(
        `${distributorUrl}/login`,
        { email, password },
        config
      );
      dispatch({
        type: DISTRIBUTOR_LOGIN_SUCCESS,
        payload: res.data,
      });
      setToken(res.data.token);
      try {
        await AsyncStorage.setItem("@token", res.data.token);
      } catch (err) {
        console.log("Couldn't set item");
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: DISTRIBUTOR_LOGIN_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

const getOrders = async() => {
  try {
    const orderList = await axios.get(`${orderUrl}`, distributorConfig)
    setOrderList(orderList)
  } catch(error) {
    console.log(error);
  }
}

  return (
    <DistributorContext.Provider
      value={{
        distributorState,
        token,
        getDistributors,
        loginDistributor,
        orderList,
        getOrders,
        // loginUser,
        // token,
        // getUserProfile,
        // logOutUser,
        // createUser,
        // distributorsList,
        // memoizedDistributorsList,
      }}
    >
      {children}
    </DistributorContext.Provider>
  );
}

export default DistributorContextProvider;