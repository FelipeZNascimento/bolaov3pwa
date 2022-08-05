import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import postItems from 'services/dataSetters';
import {
  userBets as userBetsEndpoint,
  updateRegularBet as updateRegularBetEndpoint,
  extraBets as extraBetsEndpoint,
  updateExtraBets as updateExtraBetsEndpoint
} from 'services/endpoints';

import {
  TExtraBets,
  TFetchExtraBets,
  TFetchUserBets,
  TUpdateUserBets,
  TUpdateExtraBets
} from './types';
import { STATUS as NOTIFICATION_STATUS } from 'components/notification/status';

export const fetchUserBets =
  (season: number, week: number) =>
  async (dispatch: Dispatch<TFetchUserBets>) => {
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
      });
  };

export const updateRegularBet =
  (matchId: number, betValue: number) =>
  async (dispatch: Dispatch<TUpdateUserBets>) => {
    dispatch({ type: ACTIONTYPES.UPDATING_REGULAR_BET } as const);
    const betInfo = {
      matchId,
      betValue
    };

    postItems({
      endpoint: updateRegularBetEndpoint(),
      body: betInfo
    })
      .then((response) => {
        dispatch({
          type: ACTIONTYPES.TOGGLE_NOTIFICATION,
          status: NOTIFICATION_STATUS.SUCCESS,
          notificationMessage: 'Aposta salva com sucesso'
        });

        return dispatch({
          type: ACTIONTYPES.UPDATING_REGULAR_BET_SUCCESS,
          response
        });
      })
      .catch((error) => {
        if (error.message !== '' && error.message !== undefined) {
          dispatch({
            type: ACTIONTYPES.TOGGLE_NOTIFICATION,
            status: NOTIFICATION_STATUS.INFO,
            notificationMessage: error.message
          });
        }

        return dispatch({
          type: ACTIONTYPES.UPDATING_REGULAR_BET_ERROR,
          errorMessage: error.message
        });
      });
  };

export const fetchExtraBets =
  (season: number) => async (dispatch: Dispatch<TFetchExtraBets>) => {
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
        if (error.message !== '' && error.message !== undefined) {
          return dispatch({
            type: ACTIONTYPES.TOGGLE_NOTIFICATION,
            errorMessage: error.message
          });
        }
      });
  };

export const updateExtraBets =
  (extraBets: TExtraBets) => async (dispatch: Dispatch<TUpdateExtraBets>) => {
    dispatch({ type: ACTIONTYPES.UPDATING_EXTRA_BETS } as const);

    postItems({
      endpoint: updateExtraBetsEndpoint(),
      body: JSON.stringify(extraBets)
    })
      .then((response) => {
        dispatch({
          type: ACTIONTYPES.TOGGLE_NOTIFICATION,
          status: NOTIFICATION_STATUS.SUCCESS,
          notificationMessage: 'Extra salva com sucesso'
        });

        return dispatch({
          type: ACTIONTYPES.UPDATING_EXTRA_BETS_SUCCESS,
          response
        });
      })
      .catch((error) => {
        if (error.message !== '' && error.message !== undefined) {
          dispatch({
            type: ACTIONTYPES.TOGGLE_NOTIFICATION,
            status: NOTIFICATION_STATUS.INFO,
            notificationMessage: error.message
          });
        }

        return dispatch({
          type: ACTIONTYPES.UPDATING_EXTRA_BETS_ERROR,
          errorMessage: error.message
        });
      });
  };
