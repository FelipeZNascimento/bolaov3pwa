import * as ACTIONTYPES from 'store/actiontypes';
import { TAction, TState, } from './types';

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    user: null
};

export default function matchesReducer(
    state: TState = initialState,
    action: TAction
) {
    switch (action.type) {
        case ACTIONTYPES.FETCHING_LOGIN:
        case ACTIONTYPES.FETCHING_LOGOUT:
            return {
                ...state,
                loading: true,
                errorMessage: '',
                error: false
            };
        case ACTIONTYPES.FETCHING_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                user: action.response
            };
        case ACTIONTYPES.FETCHING_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                user: null
            };
        case ACTIONTYPES.FETCHING_CONFIG_SUCCESS:
            return {
                ...state,
                user: action.response?.loggedUser
            };

        default:
            return state;
    }
}
