import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import {
    config as configEndpoint,
    ranking as rankingEndpoint,
    seasonRanking as seasonRankingEndpoint,
} from 'services/endpoints';


import {
    TFetchConfig,
    TFetchRanking,
    TSetWeek
} from './types';


export const fetchDefaultConfig = () => async (dispatch: Dispatch<TFetchConfig>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_CONFIG } as const);

    fetchItems({ endpoint: configEndpoint() })
        .then((response) => {
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
                errorMessage: error.message
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
                errorMessage: error.message
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
            dispatch({
                type: ACTIONTYPES.FETCHING_SEASON_RANKING_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
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