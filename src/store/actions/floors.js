import * as actionTypes from './actionTypes';
import axios from 'axios';

export const floorsLoadStart = () => {
    return {
        type: actionTypes.FLOORS_LOAD_START,
    };
};

export const floorsLoadSuccess = (floors) => {
    return {
        type: actionTypes.FLOORS_LOAD_SUCCESS,
        floors: floors,
    };
};

export const floorsLoadFail = (error) => {
    return {
        type: actionTypes.FLOORS_LOAD_FAIL,
        error: error,
    }
}

export const getFloors = () => {
    return dispatch => {
        dispatch(floorsLoadStart());

        const url ='http://localhost:8000/categories/'
        axios.get(url)
        .then(
            response => {   
                dispatch(floorsLoadSuccess(response.data.results));

            }).catch(error => {
                dispatch(floorsLoadFail('error'))
            });
    };
};


