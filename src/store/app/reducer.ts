import * as ACTIONTYPES from 'store/actiontypes';
import { TAction, TState } from './types';

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    isNotificationOpen: false,
    currentSeason: null,
    currentWeek: null
};

export default function appReducer(state = initialState, action: TAction) {
    switch (action.type) {
        // case ACTIONTYPES.TOGGLE_NOTIFICATION:
        //     return {
        //         ...state,
        //         isNotificationOpen: action.status !== false,
        //         errorMessage: action.errorMessage || '',
        //         error: action.errorMessage || false
        //     };
        case ACTIONTYPES.SET_CURRENT_WEEK:
            return {
                ...state,
                currentWeek: action.week
            };
        case ACTIONTYPES.FETCHING_CONFIG:
            return {
                ...state,
                loading: true,
                errorMessage: '',
                error: false
            };
        case ACTIONTYPES.FETCHING_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                error: false,
                currentSeason: action.response?.currentSeason,
                currentWeek: action.response?.currentWeek,
            };

        default:
            return state;
    }
}
