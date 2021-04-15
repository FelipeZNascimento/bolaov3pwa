import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import { config as configEndpoint } from 'services/endpoints';

import {
    TFetchConfig
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
