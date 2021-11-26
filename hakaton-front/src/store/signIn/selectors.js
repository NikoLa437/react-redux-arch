import { createSelector } from 'reselect';
import { initialState } from './reducer';

// ovo ne gledajte, to u svakom selektoru ima gde uzme stanje reducera ili inicijalno ukoliko nesto nije uredu
const selectSignIn = (state) => state.signInReducer || initialState;

// ovde bukvalno svuda ide ista sintaksa, samo se menja ovo substate.erorr 
//(tu stavljamo sta da nam vraca ova funkcija iz signInReducera)
const makeSignInError = () =>
    createSelector(selectSignIn, (substate) => substate.error);

export {
    makeSignInError,
};
