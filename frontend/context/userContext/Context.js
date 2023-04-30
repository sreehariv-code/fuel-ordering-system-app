import axios from 'axios'
import { createContext, useReducer } from 'react'
import userContextReducer from './ContextReducer'
import {
    REQUEST,
    GET_USERS,
} from './Types'

const initialState = {
    loading: false,
    users: [],
    user: {}
}

export const UserContext = createContext(initialState)

const UserContextProvider =({ children }) => {
    const [userState, dispatch] = useReducer(userContextReducer, initialState)
    const baseURL = 'http://localhost:3000/api/users'
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const getUsers = async () => {
        try {
            dispatch: {
                type: REQUEST
            }
            const users = await axios.get(`${baseURL}`, config)
            console.log(users.data)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <UserContext.Provider value = {{ userState, getUsers }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider
