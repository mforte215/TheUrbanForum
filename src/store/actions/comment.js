import * as actionTypes from './actionTypes';
import axios from 'axios';
import dompurify from 'dompurify';


function santizeContent(content) {
    const cleanInput = dompurify.sanitize(content);
    return cleanInput;
}

export const commentDeleteStart = () => {
    return {
        type: actionTypes.COMMENT_DELETE_START,
    };
};

export const commentDeleteSuccess = () => {
    return {
        type: actionTypes.COMMENT_DELETE_SUCCESS,
    };
};

export const commentDeleteFail = (error) => {
    return {
        type: actionTypes.COMMENT_DELETE_FAIL,
        error: error,
    }
}

export const commentLoadStart = () => {
    return {
        type: actionTypes.COMMENT_LOAD_START,
    };
};

export const commentLoadSuccess = (comments) => {
    return {
        type: actionTypes.COMMENT_LOAD_SUCCESS,
        comments: comments,
    };
};

export const commentLoadFail = () => {
    return {
        type: actionTypes.COMMENT_LOAD_FAIL,
    }
}

export const commentPostStart = () => {
    return {
        type: actionTypes.COMMENT_POST_START,
    };
};

export const commentPostSuccess = () => {
    return {
        type: actionTypes.COMMENT_POST_SUCCESS,
    };
};

export const commentPostFail = () => {
    return {
        type: actionTypes.COMMENT_POST_FAIL,
    };
};

export const getComments = (threadId) => {
    return dispatch => {
        dispatch(commentLoadStart());
        const url = 'http://localhost:8000/comments/';
        const params = new URLSearchParams();
        params.append('forumThread', threadId)

        const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                'forumThread': threadId,
            }
        })
        .then(
            response => {   
                dispatch(commentLoadSuccess(response.data.results));
                

            }).catch(error => {
                dispatch(commentLoadFail('error'))
            });
    }
}


export const postComment = (input) => {
    return dispatch => {
        dispatch(commentPostStart());
        const url = 'http://localhost:8000/comments/'
        const headers = {
            'Authorization': 'Bearer ' + input.token,
          }
          const formData = new FormData();

          formData.append('content', input.content)
          formData.append('forumThread', input.forumThread)
          
        axios({
            method: 'POST',
            url: url,
            headers: headers,
            data: {
                'content': input.content,
                'forumThread': input.forumThread,
            }
        }).then(
            response => {
                console.log(response);
                dispatch(commentPostSuccess())
                dispatch(getComments(input.forumThread))
            }
        ).catch(
            error => {
                console.log('error');
                dispatch(commentPostFail(error))
            }
        )
    }
}

export const deleteComment = (input) => {
    console.log('Deleting comment');
    return dispatch => {
        dispatch(commentDeleteStart());
        const url = 'http://localhost:8000/comments/' + input.commentId + '/'
        const headers = {
            'Authorization': 'Bearer ' + input.token,
          }
        axios.delete(url, {headers: headers,}).then(
            response => {
                console.log(response);
                dispatch(commentDeleteSuccess());
                dispatch(getComments(input.forumThread))
            }
        ).catch(
            error => {
                dispatch(commentDeleteFail(error));
            }
        )
    }
}
