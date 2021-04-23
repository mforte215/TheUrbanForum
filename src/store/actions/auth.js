import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userid: userId,
        isAuthenticated: true,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const checkAuthTimeout = (expirationDate) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationDate * 1000);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT,
        token: null,
        userId: null,
        isAuthenticated: false,
    }
}

export const signupStart = () => {
    return {
        type: actionTypes.SIGN_UP_START,
    }
}

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS
    }
}

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAIL,
        error: error,
    }
}

export const signup = (data) => {
    return dispatch => {
        dispatch(signupStart());
        const params = new URLSearchParams();
        params.append('username', data.username);
        params.append('password', data.password);
        params.append('confirm_password', data.confirm_password);
        params.append('email', data.email);

        
        const url ='http://localhost:8000/register/'
        axios.post(url, params)
        .then(
            response => {
                dispatch(signupSuccess());
            }
        ).catch (
            error => {
                dispatch(signupFail(error));
            }
        )


    }
}



export const newCheckAuth = () => {

}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout())
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() /1000 )));
            }
        }
    }
}

export const authenticate = (userid, password) => {
    return dispatch => {
        dispatch(authStart());
        const params = new URLSearchParams();
        params.append('grant_type', 'password')
        params.append('username', userid);
        params.append('password', password);
        params.append('client_id', process.env.REACT_APP_CLIENT_ID);
        params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);

        const config = {
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }


        const url ='http://localhost:8000/o/token/'
        axios.post(url, params, config)
        .then(
            response => {
                console.log('Setting local storage in login')
                const expirationDate = new Date(new Date().getTime() + (response.data.expires_in * 1000));
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('userId', userid);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.access_token, userid, 10));
                dispatch(checkAuthTimeout(response.data.expires_in));
            }).catch(error => {
                dispatch(authFail('error'))
            });
    };
};
