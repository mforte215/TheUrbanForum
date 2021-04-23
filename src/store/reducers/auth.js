import * as actionTypes from '../actions/actionTypes';

let initialState = {
    token: null,
    userid: null,
    error: null,
    loading: false,
    isAuthenticated: false,
}

const auth = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userid: action.userid,
                token: action.token,
                error: null,
                loading: false, 
                isAuthenticated: true,  
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userid: null,
                isAuthenticated: false,
            }
        case actionTypes.SIGN_UP_START:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.THREAD_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return {...state};
    }
}

export default auth;
