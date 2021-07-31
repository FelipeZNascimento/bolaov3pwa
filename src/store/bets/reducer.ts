import * as ACTIONTYPES from 'store/actiontypes';
import {
    TFetchUserBets,
    TFetchExtraBets,
    TUpdateExtraBets,
    TState
} from './types';

import {
    TFetchLogout
} from 'store/user/types';

const initialState: TState = {
    error: false,
    errorMessage: '',
    updating: false,
    loading: true,
    week: null,
    userBets: [],
    extraBetsResults: null,
    extraBets: [],
    userExtraBets: null
};

export default function betsReducer(
    state: TState = initialState,
    action: TFetchUserBets | TFetchExtraBets | TUpdateExtraBets | TFetchLogout
) {
    switch (action.type) {
        case ACTIONTYPES.FETCHING_EXTRA_BETS:
        case ACTIONTYPES.FETCHING_USER_BETS:
            return {
                ...state,
                loading: true,
                errorMessage: '',
                error: false
            };
        case ACTIONTYPES.UPDATING_EXTRA_BETS:
            return {
                ...state,
                updating: true,
                errorMessage: '',
                error: false
            };
        case ACTIONTYPES.UPDATING_EXTRA_BETS_SUCCESS:
            return {
                ...state,
                updating: false,
                errorMessage: '',
                error: false
            };
        case ACTIONTYPES.FETCHING_USER_BETS_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                userBets: action.response?.matches,
                week: action.response ? parseInt(action.response.week) : null
            };
        case ACTIONTYPES.FETCHING_EXTRA_BETS_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                extraBetsResults: action.response?.results,
                extraBets: action.response?.bets,
                userExtraBets: action.response?.userBets
            };
        case ACTIONTYPES.FETCHING_LOGOUT_SUCCESS:
            return {
                ...state,
                userBets: [],
                extraBets: [],
                userExtraBets: []
            };

        default:
            return state;
    }
}
