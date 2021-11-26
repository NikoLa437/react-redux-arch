import produce from 'immer';
import { getItem } from '../../utils/localStorage';
import {
    SET_TOKEN,
    SESSION_EXPIRED,
    SIGN_OUT_SUCCESS
} from './constants';

export const initialState = {
    token: getItem('token') || null,
};

const appReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_TOKEN:
                draft.token = action.token;
                break;
            case SESSION_EXPIRED:
                draft.token = null;
                break;
            case SIGN_OUT_SUCCESS:
                draft.token = null;
                break;
    }
});

export default appReducer;
