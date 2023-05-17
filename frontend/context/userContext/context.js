import axios from "axios";
import { Platform } from "react-native";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import userContextReducer from "./ContextReducer";
import { REQUEST, GET_USERS } from "./Types.js";
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
  users: [],
  user: {},
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
      const res = await axios.post(
        `${baseURL}/signup`,
        { name, email, password, phoneNumber },
        config
      );
      await AsyncStorage.setItem("@token", res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      dispatch: {
        type: REQUEST;
      }
      const users = await axios.get(`${baseURL}`, config);
      console.log(users.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUserProfile = async () => {
    try {
      dispatch: {
        type: REQUEST;
      }
      const userData = await axios.get(`${baseURL}/profile`, userConfig);
      setProfile({
        userName: userData.data.name,
        phoneNumber: userData.data.phoneNumber,
        email: userData.data.email,
      });
    } catch (error) {
      console.log(error);
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
      setToken(res.data.token);
      try {
        await AsyncStorage.setItem("@token", res.data.token);
      } catch (err) {
        console.log("Couldn't set item");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOutUser = () => {
    try {
      const res = axios.get(`${baseURL}/logout`, userConfig);
      setToken(null);
      AsyncStorage.setItem("@token", "");
      setProfile({
        userName: "",
        phoneNumber: "",
        email: "",
      });
    } catch (err) {
      console.log("User Logout Failed: " + { err });
    }
  };

  //@Distributer Context
  const [distributorsList, setDistributorList] = useState(null);

  const getListOfDistributors = async () => {
    try {
      const updatedList = await axios.get(`${distributorUrl}`, config);
      setDistributorList(updatedList.data);
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
        memoizedDistributorsList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
