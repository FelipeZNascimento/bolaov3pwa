import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import { matches as matchesEndpoint } from 'services/endpoints';

import { TFetchMatches } from './types';

export const fetchMatches =
  (season: number, week: number) =>
  async (dispatch: Dispatch<TFetchMatches>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_MATCHES } as const);

    fetchItems({ endpoint: matchesEndpoint(season, week) })
      .then((response) => {
        return dispatch({
          type: ACTIONTYPES.FETCHING_MATCHES_SUCCESS,
          response
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTIONTYPES.FETCHING_MATCHES_ERROR,
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
