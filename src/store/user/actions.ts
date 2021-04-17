import { Dispatch } from 'react';
import sha1 from 'crypto-js/sha1';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import postItems from 'services/dataSetters';
import {
    login as loginEndpoint,
    logout as logoutEndpoint
} from 'services/endpoints';

import {
    TFetchLogin,
    TFetchLogout
} from './types';

export const onLogin = (email: string, password: string) => async (dispatch: Dispatch<TFetchLogin>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_LOGIN } as const);
    const cryptoPass = sha1(password).toString();

    const loginObject = {
        email,
        password: cryptoPass
    };

    postItems({
        endpoint: loginEndpoint(),
        body: JSON.stringify(loginObject)
    })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_LOGIN_SUCCESS,
                response
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_LOGIN_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })

};

export const onLogout = () => async (dispatch: Dispatch<TFetchLogout>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_LOGOUT } as const);
    fetchItems({
        endpoint: logoutEndpoint()
    })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_LOGOUT_SUCCESS
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_LOGOUT_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};