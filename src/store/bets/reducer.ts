import * as ACTIONTYPES from 'store/actiontypes';
import { TAction, TState } from './types';

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    week: null,
    userBets: []
};

export default function betsReducer(
    state: TState = initialState,
    action: TAction
) {
    switch (action.type) {
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
        default:
            return state;
    }
}
