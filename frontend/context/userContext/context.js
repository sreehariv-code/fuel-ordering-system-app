import axios from "axios";
import { Platform } from "react-native";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import userContextReducer from "./ContextReducer";
import { 
  REQUEST, 
  USER_REGISTER_SUCESS, 
  USER_REGISTER_FAIL, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_PROFILE_SUCCESS, 
  USER_PROFILE_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL, 
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
} else {
  baseURL = iosUrl + "users";
  distributorUrl = iosUrl + "distributors";
}

const initialState = {
  loading: false,
  loggedUser: null,
  error: null,
};

export const UserContext = createContext(initialState);

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userContextReducer, initialState);
  //   const baseURL = "http://192.168.43.164:3000/api/users";

  let [token, setToken] = useState("");

  const [profile, setProfile] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const userConfig = {
    headers: {
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

  const createUser = async (name, email, phoneNumber, password) => {
    try {
      dispatch({
        type: REQUEST,
      })

      const res = await axios.post(
        `${baseURL}/signup`,
        { name, email, password, phoneNumber },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCESS,
        payload: res.data,
      })
      await AsyncStorage.setItem("@token", res.data.token);
    } catch (error) {
      console.log(error)
      dispatch({
        type: USER_REGISTER_FAIL,
      })
      const err = error.response && error.response.data.message ? error.response.data.message : error.message
    }
  };

  const getUsers = async () => {
    try {
      dispatch({
        type: REQUEST,
      })
      const users = await axios.get(`${baseURL}`, config);
      console.log(users.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUserProfile = async () => {
    try {
      dispatch({
        type: REQUEST,
      })
      const userData = await axios.get(`${baseURL}/profile`, userConfig);
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: userData.data,
      })
      // setProfile({
      //   userName: userData.data.name,
      //   phoneNumber: userData.data.phoneNumber,
      //   email: userData.data.email,
      // });
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_PROFILE_FAIL,
      })
      const err = error.response && error.response.data.message ? error.response.data.message : error.message
    }
  };

  const loginUser = async (email, password) => {
    try {
      dispatch({ type: REQUEST });
      const res = await axios.post(
        `${baseURL}/login`,
        { email, password },
        config
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res.data,
      })
      setToken(res.data.token);
      try {
        await AsyncStorage.setItem("@token", res.data.token);
      } catch (err) {
        console.log("Couldn't set item");
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: USER_LOGIN_FAIL,
      })
      const err = error.response && error.response.data.message ? error.response.data.message : error.message
    }
  };

  const logOutUser = () => {
    try {
      const res = axios.get(`${baseURL}/logout`, userConfig);
      dispatch({
        type: USER_LOGOUT_SUCCESS,
      })
      setToken(null);
      AsyncStorage.setItem("@token", "");
      // setProfile({
      //   userName: "",
      //   phoneNumber: "",
      //   email: "",
      // });
    } catch (error) {
      console.log("User Logout Failed: " + { error });
      dispatch({
        type: USER_LOGOUT_FAIL,
      })
      const err = error.response && error.response.data.message ? error.response.data.message : error.message
    }
  };

  //@Distributer Context
  const [distributorsList, setDistributorList] = useState(null);

  const getListOfDistributors = async () => {
    try {
      const updatedList = await axios.get(`${distributorUrl}`, config);
      setDistributorList(updatedList.data[0].fuelTypes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfDistributors();
  }, []);

  const memoizedDistributorsList = useMemo(
    () => distributorsList,
    [distributorsList]
  );

  console.log(memoizedDistributorsList);
  return (
    <UserContext.Provider
      value={{
        userState,
        getUsers,
        loginUser,
        token,
        getUserProfile,
        profile,
        logOutUser,
        createUser,
        distributorsList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
