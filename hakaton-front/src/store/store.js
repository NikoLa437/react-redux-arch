import { createStore, applyMiddleware, compose  } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import { routerMiddleware } from 'connected-react-router';
import history from "../utils/history";
import appSaga from "./app/saga";
import { fork } from "@redux-saga/core/effects";
import signInSaga from "./signIn/saga";

let composeEnhancers = compose;

// ovde samo kada se napravi nova saga treba je registrovati sa yield fork(naziv sage, to je ona root funckija gde definisemo ostale funkciije)
function* rootSaga () {
    yield fork(appSaga)
    yield fork(signInSaga)
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];
const enhancers = [applyMiddleware(...middlewares)];

export const store = createStore(
    reducers,
    composeEnhancers(...enhancers)
);

sagaMiddleware.run(rootSaga);