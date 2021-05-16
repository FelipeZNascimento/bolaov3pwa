import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import {
    userBets as userBetsEndpoint,
    extraBets as extraBetsEndpoint
} from 'services/endpoints';

import {
    TFetchExtraBets,
    TFetchUserBets,
} from './types';

export const fetchUserBets = (season: number, week: number) => async (dispatch: Dispatch<TFetchUserBets>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_USER_BETS } as const);

    fetchItems({ endpoint: userBetsEndpoint(season, week) })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_USER_BETS_SUCCESS,
                response
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_USER_BETS_ERROR,
                errorMessage: error.message
            });
        })
};

export const fetchExtraBets = (season: number) => async (dispatch: Dispatch<TFetchExtraBets>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_EXTRA_BETS } as const);

    fetchItems({ endpoint: extraBetsEndpoint(season) })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_EXTRA_BETS_SUCCESS,
                response
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_EXTRA_BETS_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};
