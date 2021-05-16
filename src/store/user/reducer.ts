import * as ACTIONTYPES from 'store/actiontypes';
import { TAction, TState, } from './types';

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: true,
    user: null
};

export default function matchesReducer(
    state: TState = initialState,
    action: TAction
) {
    switch (action.type) {
        case ACTIONTYPES.UPDATING_USER:
        case ACTIONTYPES.REGISTERING:
        case ACTIONTYPES.FETCHING_LOGIN:
        case ACTIONTYPES.FETCHING_LOGOUT:
            return {
                ...state,
                loading: true,
                errorMessage: '',
                error: false
            };
        case ACTIONTYPES.REGISTERING_SUCCESS:
        case ACTIONTYPES.FETCHING_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                user: action.response
            };
        case ACTIONTYPES.UPDATING_USER_SUCCESS:
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
        // case ACTIONTYPES.FETCHING_CONFIG_SUCCESS:
        //     return {
        //         ...state,
        //         user: action.response?.loggedUser
        //     };

        case ACTIONTYPES.UPDATING_USER_ERROR:
        case ACTIONTYPES.REGISTERING_ERROR:
        case ACTIONTYPES.FETCHING_LOGIN_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                error: true
            };
        case ACTIONTYPES.UPDATE_PASSWORD_ERROR:
            return {
                ...state,
                errorMessage: 'Senha incorreta',
                error: true
            };
        case ACTIONTYPES.CLEAR_ERRORS:
            return {
                ...state,
                errorMessage: '',
                error: false
            };

        default:
            return state;
    }
}
