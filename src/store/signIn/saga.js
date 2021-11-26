import { takeLatest, put, call } from 'redux-saga/effects';
import { signInError } from './actions';
import { SIGN_IN_REQUEST } from './constants';
import { push } from 'connected-react-router'
import { ROUTES } from '../../constants';
import { setItem } from '../../utils/localStorage';
import { setToken } from '../app/actions';

const ENDPOINTS = {
    LOGIN_USER: '/login',
};

export function* loginUser({
    email,
    password,
}) {
    try {
        //stavio sam if true samo da bih demonstrirao errore, prebaci na false da vidis da i error funckionise
        if(true){
            // sa put pozivamo akciju iz actions.js, ona zatim poziva reducer i menjamo stanje
            yield put(signInError(null));

            //Pozivi se svi zovu sa yield call, salje se request taj interceptor, i stave se url, method i data ukoliko je post method
            //bkvl je to ceo poziv, i dobija se response, u slucaju da nesto nije uredu ide u catch i dole imamo status kodove
            //ako treba da se hendla to
            /*
            const data = {
                email,
                password,
            };

            const { access, refresh } = yield call(request, {
                url: ENDPOINTS.LOGIN_USER,
                method: 'post',
                data,
            });*/

            // pomocu call metode sage se poziva direktno neka funkcija, znaci call poziva bas js funkciju dok put poziva akciju
            // call je bkvl poziv funkcije dok je put bkvl dispatch iz sage
            // kad idete signin proverite local storage i setovalo se, na logout ce se izgubiti
            yield call(setItem, 'token', 'nekitoken');
            yield put(setToken('nekitoken'));

            //yield put(signInSuccess());

            // push bkvl menja stranicu, znaci ovde ako je login uspesan, i nije puklo nista saljemo na home_page
            yield put(push(ROUTES.HOME_PAGE))
        }else{
            // kad prebacis gore na false pozivamo da se error desio
            // pozivamo signInError akciju i ona poziva reducer da se desio error i setuje error u reducer stanju na Andrija error
            yield put(signInError("Andrija error"));
        }
        
    } catch (error) {
        // na ovaj nacin se hendlaju status kodovi, npr ukoliko je 401 saljemo put(dispatch) na akciju signInError sa porukom
        // zatim to ide u reducer i editujemo singInError
        // Pogledajte i selectors.js fajl, tu prakticno pravimo funkciju koja ce nam vratiti error npr i bilo gde u app
        // kada ukucamo const error= useSelector(makeErrorMessage()) vraca nam to, i updatuje se na promenu u reduceru


        //if(error.status === 401){
        //    yield put(signInError("No user found with the given credentials"));
        //}
  }
}

export default function* signInSaga() {
    // ovde bukvalno definisemo da za SIGN_IN_REQUEST kad dispatcujemo poziva saga metodu loginUser
    yield takeLatest(SIGN_IN_REQUEST, loginUser);
}