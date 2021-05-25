import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import {
    config as configEndpoint,
    ranking as rankingEndpoint,
    seasonRanking as seasonRankingEndpoint,
} from 'services/endpoints';

import {
    TClearNotification,
    TFetchConfig,
    TFetchRanking,
    TSetWeek,
} from './types';

export const fetchDefaultConfig = () => async (dispatch: Dispatch<TFetchConfig>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_CONFIG } as const);
    dispatch({ type: ACTIONTYPES.FETCHING_LOGIN } as const);

    fetchItems({ endpoint: configEndpoint() })
        .then((response) => {
            if (response.loggedUser) {
                dispatch({
                    type: ACTIONTYPES.FETCHING_LOGIN_SUCCESS,
                    response: response.loggedUser
                });
            } else {
                dispatch({
                    type: ACTIONTYPES.FETCHING_LOGIN_ERROR,
                    response: response.loggedUser
                });
            }
            return dispatch({
                type: ACTIONTYPES.FETCHING_CONFIG_SUCCESS,
                response
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_CONFIG_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                notificationMessage: error.message
            });
        })
};

export const fetchRanking = (season: number, week: number) => async (dispatch: Dispatch<TFetchRanking>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_RANKING } as const);

    fetchItems({ endpoint: rankingEndpoint(season, week) })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_RANKING_SUCCESS,
                ranking: response.users
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_RANKING_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                notificationMessage: error.message
            });
        })
};

export const fetchSeasonRanking = (season: number) => async (dispatch: Dispatch<TFetchRanking>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_SEASON_RANKING } as const);

    fetchItems({ endpoint: seasonRankingEndpoint(season) })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_SEASON_RANKING_SUCCESS,
                ranking: response.users
            });
        })
        .catch((error) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_SEASON_RANKING_ERROR,
                errorMessage: error.message
            });
        })
};

export const setCurrentWeek = (week: number) => async (dispatch: Dispatch<TSetWeek>) => {
    return dispatch({
        type: ACTIONTYPES.SET_CURRENT_WEEK,
        week
    });
};

export const onClearNotification = (id: string) => async (dispatch: Dispatch<TClearNotification>) => {
    console.log(id);
    return dispatch({
        type: ACTIONTYPES.CLEAR_NOTIFICATION,
        id
    });
};