import {
    REQUEST,
    GET_USERS,
} from './Types'

const userContextReducer = (state, action) => {
    let newState = {}
    switch(action.type) {
        case REQUEST:
            return {...state, loading: true}
        case GET_USERS:
            newState = {
                ...state,
                loading: false,
                users: action.payload
            }
            return newState
        default: 
            return state
    }
}

export default userContextReducer