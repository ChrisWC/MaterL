import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import {auth_url} from '../../../config.public';

export const init = () => {
    return {
        type:"INIT",
        username:null,
        email:null,
        attempts:0
    }
}
export const login = (username, password) => {
    return dispatch => {
        dispatch({type:"LOGIN_ATTEMPT"});

        return fetch(auth_url, {
            method: 'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            mode:'cors',
            body:'username=' + username + '&password='+password})
        .then(response => response.json())
        .then(json => {
            if (json['non_field_errors'] !== undefined) {
                dispatch({
                    type:'LOGIN_FAILED'
                })
            }
            else {
                cookie.save('jwt_token', response.token, {path:'/'})
                dispatch({
                    type:'LOGIN_SUCCESS',
                })
            }
        })
    }
}
export const register = (email, username, password, password) => {
    return dispatch => {
        dispatch({type:"LOGIN_ATTEMPT"});

        return fetch(auth_url, {
            method: 'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            mode:'cors',
            body:'username=' + username + '&password='+password})
        .then(response => response.json())
        .then(json => {
            if (json['non_field_errors'] !== undefined) {
                dispatch({
                    type:'LOGIN_FAILED'
                })
            }
            else {
                cookie.save('jwt_token', response.token, {path:'/'})
                dispatch({
                    type:'LOGIN_SUCCESS',
                })
            }
        })
    }
}
export const register = () => {
    return {

    }
}
