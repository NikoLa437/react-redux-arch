import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR
} from './constants';

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        email,
        password,
    };
}

export function signInSuccess() {
    return {
        type: SIGN_IN_SUCCESS,
    };
}

export function signInError(error) {
    return {
        type: SIGN_IN_ERROR,
        error,
    };
}