import * as actionTypes from '../actions/actionTypes';

let initialState = {
    information: [],
    loading: false,
    error: null,
    currentCategory: {
        name: null,
        id: null,
    }
}

const thread = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.THREAD_EDIT_START:
            return {
                ...state,
                error: null,
                loading: true,
            }
        case actionTypes.THREAD_EDIT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
            }
        case actionTypes.THREAD_EDIT_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.THREAD_POST_START:
            return {
                ...state,
                error: null,
                loading: true,
            }
        case actionTypes.THREAD_POST_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
            }
        case actionTypes.THREAD_POST_FAIL:
                return {
                    ...state,
                    error: action.error,
                    loading: false,
                }
        case actionTypes.THREAD_LOAD_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.THREAD_LOAD_SUCCESS:
            return {
                ...state,
                information: action.information,
                loading: false,
                error: null,
            };
        case actionTypes.THREAD_LOAD_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.SET_THREAD_CATEGORY:
            return {
                ...state,
                currentCategory: {
                    name: action.name,
                    id: action.id,
                }
            }
        default:
            return {...state};
    }
}

export default thread;