import * as ACTIONTYPES from 'store/actiontypes';
import { TAction, TState } from './types';

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    week: null,
    userBets: [],
    extraBetsResults: null,
    extraBets: [],
};

export default function betsReducer(
    state: TState = initialState,
    action: TAction
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
        case ACTIONTYPES.FETCHING_USER_BETS_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                userBets: action.response?.matches,
                week: action.response? parseInt(action.response.week) : null
            };
        case ACTIONTYPES.FETCHING_EXTRA_BETS_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                extraBetsResults: action.response?.results,
                extraBets: action.response?.bets,
            };
        default:
            return state;
    }
}
