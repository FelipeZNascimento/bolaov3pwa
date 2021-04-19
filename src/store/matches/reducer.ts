import * as ACTIONTYPES from 'store/actiontypes';
import { TAction, TState } from './types';

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    week: null,
    matches: []
};

export default function matchesReducer(
    state: TState = initialState,
    action: TAction
) {
    switch (action.type) {
        case ACTIONTYPES.FETCHING_MATCHES:
            return {
                ...state,
                loading: true,
                errorMessage: '',
                error: false
            };
        case ACTIONTYPES.FETCHING_MATCHES_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                matches: action.response?.matches,
                week: action.response? parseInt(action.response.week) : null
            };
        default:
            return state;
    }
}
