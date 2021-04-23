import * as actionTypes from './actionTypes';
import axios from 'axios';
import dompurify from 'dompurify';



function santizeContent(content) {
    const cleanInput = dompurify.sanitize(content);
    return cleanInput;
}

export const threadEditStart = () => {
    return {
        type: actionTypes.THREAD_EDIT_START,
    }
}

export const threadEditSuccess = () => {
    return {
        type: actionTypes.THREAD_EDIT_SUCCESS,
    }
}

export const threadEditFail = (error) => {
    return {
        type: actionTypes.THREAD_EDIT_FAIL,
        error: error,
    }
}

export const threadPostStart = () => {
    return {
        type: actionTypes.THREAD_POST_START,
    }
}

export const threadPostSuccess = () => {
    return {
        type: actionTypes.THREAD_POST_SUCCESS,
    }
}

export const threadPostFail = () => {
    return {
        type: actionTypes.THREAD_POST_FAIL,
    }
}

export const threadLoadStart = () => {
    return {
        type: actionTypes.THREAD_LOAD_START,
    };
};

export const threadLoadSuccess = (information) => {
    return {
        type: actionTypes.THREAD_LOAD_SUCCESS,
        information: information,
    };
};

export const threadLoadFail = (error) => {
    return {
        type: actionTypes.THREAD_LOAD_FAIL,
        error: error,
    }
}

export const postThread = (input) => {

    return dispatch => {
        dispatch(threadPostStart());
        const url = 'https://intense-bastion-18708.herokuapp.com/threads/'
        const headers = {
            'Authorization': 'Bearer ' + input.token,
          }
          
        axios({
            method: 'POST',
            url: url,
            headers: headers,
            data: {
                'title': input.title,
                'body': input.content,
                'category': input.category,
                'threadcomments': [],
                'tags': ['hello']
            }
        }).then(
            response => {
                console.log(response);
                dispatch(threadPostSuccess());
                dispatch(getThread(input.category));
            }
        ).catch(
            error => {
                console.log('Fail');
                console.log(error);
                dispatch(threadPostFail(error))
            }
        )
    }
}

export const updateThread = (input) => {
    console.log('Logging input');
    console.log(input);
    return dispatch => {
        dispatch(threadEditStart());
        const url = 'https://intense-bastion-18708.herokuapp.com/threads/' + input.thread + '/';

        let config = {
            headers: {
                'Authorization': 'Bearer ' + input.token,
            }
          }

        let data  = {
            'body': input.content,
            'category': input.categoryId,
            'tags': ['Test']
        }

        axios.put(url, data, config).then(
            response => {
                dispatch(threadEditSuccess());
                dispatch(getThread(input.threadId));
            }
        ).catch(
            error => {
                dispatch(threadEditFail(error));
            }
        )
    }
}

export const getThread = (threadId) => {
   
    return dispatch => {
        dispatch(threadLoadStart());

        const url ='https://intense-bastion-18708.herokuapp.com/?thread_identifier=' + threadId;
        axios.get(url)
        .then(
            response => {
                response.data.body = santizeContent(response.data.body);
                dispatch(threadLoadSuccess(response.data.results.pop()));
                

            }).catch(error => {
                dispatch(threadLoadFail('error'))
                
            });
    };
};

export const setThreadCategory = (threadName, threadId) => {
    return {
        type: actionTypes.SET_THREAD_CATEGORY,
        currentCategory: {
            name: threadName,
            id: threadId,
        }
    }
}

