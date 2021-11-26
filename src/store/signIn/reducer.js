import produce from 'immer';

import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
} from './constants';

//postavljamo inicijalna stanja za signInReducer
export const initialState = {
    error: null,
};

const signInReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SIGN_IN_REQUEST:
                //ovaj produce bkvl napravi kopiju inicijalnog stanja, i mi samo u draft izmenimo i on vrati novo stanje
                // da ne bi kucali uvek const copyData= {...stata} pa menjali stanje pa isli return copyData
                draft.error = null;
                break;
            case SIGN_IN_SUCCESS:
                draft.error = null;
                break;
            case SIGN_IN_ERROR:
                draft.error = action.error;
                break;
        }
    });

export default signInReducer;
