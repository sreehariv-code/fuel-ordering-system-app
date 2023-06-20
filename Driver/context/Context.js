import axios from "axios";
import { Platform } from "react-native";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import driverContextReducer from "./ContextReducer";
import {
  REQUEST,
  DRIVER_REGISTER_SUCESS,
  DRIVER_REGISTER_FAIL,
  DRIVER_LOGIN_SUCCESS,
  DRIVER_LOGIN_FAIL,
  DRIVER_PROFILE_SUCCESS,
  DRIVER_PROFILE_FAIL,
  DRIVER_LOGOUT_SUCCESS,
  DRIVER_LOGOUT_FAIL,
} from "./Types.js";
import Constants from "expo-constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { manifest } = Constants;

const androidUrl = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:3000/api/`;
const iosUrl = `http://localhost:3000/api/`;
let baseUrl, distributorUrl, driverUrl;
if (Platform.OS === "android") {
  baseUrl = androidUrl + "users";
  distributorUrl = androidUrl + "distributors";
  orderUrl = androidUrl + "orders";
  driverUrl = androidUrl + "drivers"
} else {
  baseUrl = iosUrl + "users";
  distributorUrl = iosUrl + "distributors";
  orderUrl = iosUrl + "orders";
  driverUrl = iosUrl + "drivers"
}

const initialState = {
  loading: false,
  loggedDriver: null,
  error: null,
};

export const DriverContext = createContext(initialState);

const DistributorContextProvider = ({ children }) => {
    const [driverState, dispatch] = useReducer(driverContextReducer, initialState);
    const [orderList, setOrderList] = useState([]);
    let [token, setToken] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const driverConfig = {
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

  const getDrivers = async () => {
    try {
      dispatch({
        type: REQUEST,
      });
      const drivers = await axios.get(`${driverUrl}`, config);
      console.log(drivers.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loginDriver = async (email, password) => {
    try {
      dispatch({ type: REQUEST });
      const res = await axios.post(
        `${driverUrl}/login`,
        { email, password },
        config
      );
      dispatch({
        type: DRIVER_LOGIN_SUCCESS,
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
        type: DRIVER_LOGIN_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  const createDriver = async (name, email, password, phoneNumber, licence) => {
    try {
      dispatch({
        type: REQUEST,
      })

      const res = await axios.post(
        `${driverUrl}/signup`,
        { name, email, password, phoneNumber, licence },
        config
      )
      dispatch({
        type: DRIVER_REGISTER_SUCESS,
        payload: res.data,
      })
      setToken(res.data.token)
      await AsyncStorage.setItem("@token", res.data.token)
    } catch(error) {
      console.log(error)
      dispatch({
        type: DRIVER_REGISTER_FAIL,
      })
    }
  }

  const getDriverProfile = async (token) => {
    try {
      dispatch({
        type: REQUEST,
      });
      setToken(token);
      const res = await axios.get(`${driverUrl}/profile`, driverConfig);

      dispatch({
        type: DRIVER_PROFILE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
       console.log(error);
      dispatch({
        type: DRIVER_PROFILE_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await axios.patch(`${orderUrl}/update-status/${id}`, {status}, driverConfig)
      console.log(res.data)
    } catch(error) {
      console.log(error)
    }
  }

  const logoutDriver = async () => {
    try {
      const res = axios.get(`${driverUrl}/logout`, driverConfig);
      dispatch({
        type: DRIVER_LOGOUT_SUCCESS,
      });
      setToken(null)
      AsyncStorage.setItem("@token", "");
    } catch (error) {
      console.log("Driver Logout Failed: " + { error });
      dispatch({
        type: DRIVER_LOGOUT_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  const getOrders = async () => {
    try {
      const orderList = await axios.get(`${orderUrl}`, driverConfig);
      for (let i = 0; i < orderList.data.length; i++) {
        const order = orderList.data[i];
        const distributorDetails = await axios.get(`${distributorUrl}/distributor/${order.distributor}`, config)
        const userDetails = await axios.get(`${baseUrl}/user/${order.user}`, config);
        orderList.data[i] = { ...order, userInfo: userDetails.data, distributorInfo: distributorDetails.data };
      }
      setOrderList(orderList.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DistributorContext.Provider
      value={{
        driverState,
        token,
        orderList,
        getDrivers,
        loginDriver,
        getOrders,
        getDriverProfile,
        updateOrderStatus,
        logoutDriver,
        createDriver,
      }}
    >
      {children}
    </DistributorContext.Provider>
  );
}

export default DistributorContextProvider;