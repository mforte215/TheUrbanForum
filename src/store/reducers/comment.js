import { StaticRouter } from 'react-router';
import * as actionTypes from '../actions/actionTypes';

let initialState = {
    loading: false,
    error: null,
    comments: []
}

const comment = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.COMMENT_DELETE_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.COMMENT_DELETE_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
            }
        case actionTypes.COMMENT_DELETE_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.COMMENT_POST_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.COMMENT_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case actionTypes.COMMENT_POST_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.COMMENT_LOAD_START:
            return {
                ...state,
                error: null,
                loading: true,
            }
        case actionTypes.COMMENT_LOAD_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                comments: action.comments,
            }
        case actionTypes.COMMENT_LOAD_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.COMMENT_DELETE:
            return {
                ...state,
                error: null,
                loading: false,
                comments: action.comments,
            }
        default:
            return {...state};
    }
}

export default comment;