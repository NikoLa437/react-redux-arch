import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = (state) => state.appReducer || initialState;

const makeSelectToken = () =>
    createSelector(selectApp, (substate) => substate.token);

const makeSelectRefreshToken = () =>
    createSelector(selectApp, (substate) => substate.refreshToken);

export {
    makeSelectToken,
    makeSelectRefreshToken,
};
