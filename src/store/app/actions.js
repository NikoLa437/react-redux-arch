import {
    SET_TOKEN,
    SESSION_EXPIRED,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS
} from './constants';

export function setToken(token) {
    return {
        type: SET_TOKEN,
        token,
    };
}

export function sessionExpired() {
    return {
        type: SESSION_EXPIRED,
    };
}

export function signOut() {
    return {
      type: SIGN_OUT_REQUEST,
    };
}
  
export function signOutSuccess() {
    return {
      type: SIGN_OUT_SUCCESS,
    };
}