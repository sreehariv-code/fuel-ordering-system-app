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
let baseUrl, distributorUrl;
if (Platform.OS === "android") {
  baseUrl = androidUrl + "users";
  distributorUrl = androidUrl + "distributors";
  orderUrl = androidUrl + "orders";
} else {
  baseUrl = iosUrl + "users";
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
    const [fuelInfo, setFuelInfo] = useState([])
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

  const createDistributor = async (name, email, password, phoneNumber, stationName, licenceNumber, address) => {
    try {
      dispatch({
        type: REQUEST,
      })

      const res = await axios.post(
        `${distributorUrl}/signup`,
        { name, email, password, phoneNumber, stationName, licenceNumber, address},
        config
      )
      dispatch({
        type: DISTRIBUTOR_REGISTER_SUCESS,
        payload: res.data,
      })
      setToken(res.data.token)
      await AsyncStorage.setItem("@token", res.data.token)
    } catch(error) {
      console.log(error)
      dispatch({
        type: DISTRIBUTOR_REGISTER_FAIL,
      })
    }
  }

  const getDistributorProfile = async (token) => {
    try {
      dispatch({
        type: REQUEST,
      });
      setToken(token);
      const res = await axios.get(`${distributorUrl}/profile`, distributorConfig);

      dispatch({
        type: DISTRIBUTOR_PROFILE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
       console.log(error);
      dispatch({
        type: DISTRIBUTOR_PROFILE_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  const getFuelInfo = async(token) => {
    try {
      setToken(token)
      const res = await axios.get(`${distributorUrl}/fuel-info`,distributorConfig)
      setFuelInfo(res.data.fuelTypes)
      
    } catch (error) {
      console.log(error)
    }
  }

  const updateFuelInfo = async(fuelName, price, available) => {
    try {
      const res = await axios.patch(`${distributorUrl}/update-fuel-info`, {fuelName, price, available}, distributorConfig)
      setFuelInfo(res.data.fuelTypes)
    } catch(error) {
      console.log(error)
    }
  }

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await axios.patch(`${orderUrl}/update-status/${id}`, {status}, distributorConfig)
      console.log(res.data)
    } catch(error) {
      console.log(error)
    }
  }

  const logOutDistributor = async () => {
    try {
      const res = axios.get(`${distributorUrl}/logout`, distributorConfig);
      dispatch({
        type: DISTRIBUTOR_LOGOUT_SUCCESS,
      });
      setToken(null)
      AsyncStorage.setItem("@token", "");
    } catch (error) {
      console.log("Distributor Logout Failed: " + { error });
      dispatch({
        type: DISTRIBUTOR_LOGOUT_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  const getOrders = async () => {
    try {
      const orderList = await axios.get(`${orderUrl}`, distributorConfig);
      for (let i = 0; i < orderList.data.length; i++) {
        const order = orderList.data[i];
        const userDetails = await axios.get(`${baseUrl}/${order.user}`, config);
        orderList.data[i] = { ...order, userInfo: userDetails.data };
      }
      setOrderList(orderList.data)
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <DistributorContext.Provider
      value={{
        distributorState,
        token,
        orderList,
        fuelInfo,
        getDistributors,
        loginDistributor,
        getOrders,
        getDistributorProfile,
        getFuelInfo,
        updateFuelInfo,
        updateOrderStatus,
        logOutDistributor,
        createDistributor,
      }}
    >
      {children}
    </DistributorContext.Provider>
  );
}

export default DistributorContextProvider;