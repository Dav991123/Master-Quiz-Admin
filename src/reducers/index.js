import { SET_IS_AUTH } from '../core/constants/actionTypes';

export const reducers = (state, action) => {
    switch(action.type) {
        case SET_IS_AUTH: return {
            ...state,
            isAuth: action.payload
        };
        default:
            return state
    }
};
