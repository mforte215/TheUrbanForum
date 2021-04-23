import * as actionTypes from '../actions/actionTypes';

let initialState = {
    floors: [],
    category: null,
    loading: false,
    error: null,
}

const floors = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.FLOORS_LOAD_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.FLOORS_LOAD_SUCCESS:
            return {
                ...state,
                floors: action.floors,
                loading: false,
                error: null,
            };
        case actionTypes.FLOORS_LOAD_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        default:
            return {...state};
    }
}

export default floors;
