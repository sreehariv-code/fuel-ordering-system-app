import axios from "axios";
import { Platform } from "react-native";
import { createContext, useReducer } from "react";
import userContextReducer from "./ContextReducer";
import { REQUEST, GET_USERS } from "./Types.js";
import Constants from "expo-constants";

const { manifest } = Constants;

const androidUrl = `http://${manifest.debuggerHost.split(":").shift()}:3000`;
const iosUrl = `http://localhost:3000`;
let baseURL;
if (Platform.OS === "android") {
  baseURL = androidUrl;
} else {
  baseURL = iosUrl;
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
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getUsers = async () => {
    try {
      dispatch: {
        type: REQUEST;
      }
      const users = await axios.get(`${baseURL}/api/users`, config);
      console.log(users.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <UserContext.Provider value={{ userState, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
