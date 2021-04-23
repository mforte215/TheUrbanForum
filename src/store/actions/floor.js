import * as actionTypes from './actionTypes';
import axios from 'axios';

export const floorLoadStart = () => {
    return {
        type: actionTypes.FLOOR_LOAD_START,
    };
};

export const floorLoadSuccess = (discussions) => {
    return {
        type: actionTypes.FLOOR_LOAD_SUCCESS,
        discussions: discussions,
    };
};

export const floorLoadFail = (error) => {
    return {
        type: actionTypes.FLOOR_LOAD_FAIL,
        error: error,
    }
}

export const getFloor = (categoryName) => {
    console.log('Load started');
    return dispatch => {
        dispatch(floorLoadStart());

        const url ='https://intense-bastion-18708.herokuapp.com/categories/?name=' + categoryName;
        axios.get(url)
        .then(
            response => {
                console.log('Response in Floor Load');
                console.log(response);
                let convertedResults = response.data.results.toJSON();
                dispatch(floorLoadSuccess(convertedResults));

            }).catch(error => {
                dispatch(floorLoadFail('error'))
            });
    };
};

export const categoryLoadSuccess = (category) => {
    console.log('In success logging category');
    console.log(category);
    return {
        type: actionTypes.CATEGORY_LOAD_SUCCESS,
        category: category,
    }
}

export const categoryLoadFail = (error) => {
    return {
        type: actionTypes.CATEGORY_LOAD_FAIL,
        error: error,
    }
}

export const getCategory = (name) => {
    return dispatch => {
        const url ='https://intense-bastion-18708.herokuapp.com/categories/?name=' + name;

        axios.get(url)
        .then(
            response => {
                console.log(response);
                console.log('Object I want:')
                const element = response.data.results[0];
                dispatch(categoryLoadSuccess(element));
            }
        ).catch(
            error => {
                console.log(error);
                categoryLoadFail(error);
                
            }
        )

    }
}


export const threadDeleteStart = () => {
    return {
        type: actionTypes.THREAD_DELETE_START,
    }
}

export const threadDeleteFail = () => {
    return {
        type: actionTypes.THREAD_DELETE_FAIL,
    }
}

export const threadDeleteSuccess = () => {
    return {
        type: actionTypes.THREAD_DELETE_SUCCESS,
    }
}

export const deleteThread = (input) => {
    return dispatch => {
        dispatch(threadDeleteStart());
        const url = 'https://intense-bastion-18708.herokuapp.com/threads/' + input.threadId + '/'
        const headers = {
            'Authorization': 'Bearer ' + input.token,
          }
        axios.delete(url, {headers: headers,}).then(
            response => {
                console.log(response);
                dispatch(threadDeleteSuccess());
                dispatch(getCategory(input.categoryName))
            }
        ).catch(
            error => {
                dispatch(threadDeleteFail(error));
            }
        )
    }
}