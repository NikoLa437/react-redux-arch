import { call, select, put } from 'redux-saga/effects';
import axios from 'axios';

import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';
import { makeSelectToken } from '../store/app/selectors';
import { removeItem } from './localStorage';
import { sessionExpired } from '../store/app/actions';
import { isTokenValid } from './jwtToken';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string') {
        return response;
    } else if(Array.isArray(response.data)){
        return response.data
    }
    else {
        return mapKeys(response.data, (_, key) => camelCase(key));
    }
  },
  (error) => Promise.reject(error.response)
);

export default function* request({ url, method, data, headers = {} }) {
  try {
    let token = yield select(makeSelectToken())

    if (token && isTokenValid(token)) {
        headers.Authorization = `Bearer ${token}`;
    }

    return yield call(api, { method, url, headers, data });
  } catch (error) {
    if (error.status === 401) {
        yield call(removeItem, 'token');
        yield call(removeItem, 'refresh_token');
        yield put(sessionExpired());
    } 
    
		throw error;
	}
}