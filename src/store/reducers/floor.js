import * as actionTypes from '../actions/actionTypes';

let initialState = {
    discussions: [],
    loading: false,
    error: null,
    category: {},
}

const floor = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.THREAD_DELETE_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.THREAD_DELETE_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
            }
        case actionTypes.THREAD_DELETE_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.CATEGORY_LOAD_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                category: action.category

            }
        case actionTypes.CATEGORY_LOAD_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.FLOOR_LOAD_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.FLOOR_LOAD_SUCCESS:
            return {
                ...state,
                discussions: action.discussions,
                loading: false,
                error: null,
            };
        case actionTypes.FLOOR_LOAD_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        default:
            return {...state};
    }
}

export default floor;
