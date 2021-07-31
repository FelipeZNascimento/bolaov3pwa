import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actiontypes';
import postItems from 'services/dataSetters';
import {
    records as recordsEndpoint,
} from 'services/endpoints';

import {
    TFetchRecords
} from './types';

export const fetchRecords = (
    accumulated: boolean = false,
    orderBy: string,
    sortAsc: boolean,
    limit: number,
    season: number | null,
    week: number | null,
    userId: string | null
) => async (dispatch: Dispatch<TFetchRecords>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_RECORDS } as const);

    postItems({
        endpoint: recordsEndpoint(),
        body: {
            accumulated,
            orderBy,
            sortAsc,
            limit,
            season,
            week,
            userId
        }
    })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_RECORDS_SUCCESS,
                response
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_RECORDS_ERROR,
                errorMessage: error.message
            });
            if (error.message !== '' && error.message !== undefined) {
                return dispatch({
                    type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                    errorMessage: error.message
                });
            }
        })
};