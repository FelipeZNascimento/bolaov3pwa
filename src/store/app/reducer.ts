import * as ACTIONTYPES from 'store/actiontypes';
import {
    TClearNotification,
    TFetchConfig,
    TFetchRanking,
    TSetWeek,
    TState
} from './types';

const initialState: TState = {
    currentSeason: null,
    currentWeek: null,
    error: false,
    errorMessage: '',
    loading: false,
    notifications: [],
    ranking: [],
    seasonRanking: [],
    teams: [],
    teamsByConferenceAndDivision: {
        afc: {
            north: [],
            east: [],
            south: [],
            west: [],
        },
        nfc: {
            north: [],
            east: [],
            south: [],
            west: [],
        }
    },
};

export default function appReducer(
    state = initialState,
    action: TClearNotification | TSetWeek | TFetchConfig | TFetchRanking
) {
    switch (action.type) {
        case ACTIONTYPES.CLEAR_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter((item) => item.id !== action.id)
            }
        case ACTIONTYPES.TOGGLE_NOTIFICATION:
            return {
                ...state,
                notificationIsOpen: true,
                notifications: [...state.notifications, {
                    id: Date.now(),
                    message: action.notificationMessage || '',
                    status: action.status
                }],
            };
        case ACTIONTYPES.SET_CURRENT_WEEK:
            return {
                ...state,
                currentWeek: action.week
            };
        case ACTIONTYPES.FETCHING_RANKING:
        case ACTIONTYPES.FETCHING_SEASON_RANKING:
        case ACTIONTYPES.FETCHING_CONFIG:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                currentSeason: action.response?.currentSeason,
                currentWeek: action.response?.currentWeek,
                teams: action.response?.teams,
                teamsByConferenceAndDivision: action.response?.teamsByConferenceAndDivision
            };

        case ACTIONTYPES.FETCHING_RANKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                ranking: action.ranking
            };

        case ACTIONTYPES.FETCHING_SEASON_RANKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                seasonRanking: action.ranking
            };

        default:
            return state;
    }
}
