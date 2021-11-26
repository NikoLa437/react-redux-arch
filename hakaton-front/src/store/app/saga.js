import { takeLatest, call, put } from 'redux-saga/effects';
import { signOutSuccess } from './actions';
import {  SIGN_OUT_REQUEST } from './constants';

import { push } from 'connected-react-router'
import { ROUTES } from '../../constants';
import { removeItem } from '../../utils/localStorage';

export function* signOut() {
    try {
        // pozivamo put, znaci prakticno dispatch akciju signOutSuccess gde resetujemo token
        yield put(signOutSuccess());
        // pozivamo call, znaci pozivamo funkciju removeItem koja remove radi iz local storage
        yield call(removeItem, 'token');
        // redirektujemo se na sign in page
        yield put(push(ROUTES.SIGNIN))
    } catch (error) {
        console.log(error)
    }
}

export default function* appSaga() {
    yield takeLatest(SIGN_OUT_REQUEST, signOut);
}