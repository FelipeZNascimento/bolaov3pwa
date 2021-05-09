import { Dispatch } from 'react';
import sha1 from 'crypto-js/sha1';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import postItems from 'services/dataSetters';
import {
    login as loginEndpoint,
    register as registerEndpoint,
    logout as logoutEndpoint
} from 'services/endpoints';

import {
    TClearErrors,
    TFetchLogin,
    TFetchLogout,
    TFetchRegister,
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
        body: loginObject
    })
        .then((response) => {
            if (response) {
                return dispatch({
                    type: ACTIONTYPES.FETCHING_LOGIN_SUCCESS,
                    response
                });
            } else {
                return dispatch({
                    type: ACTIONTYPES.FETCHING_LOGIN_ERROR,
                    errorMessage: 'Login e/ou senha incorretos'
                });
            }
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

export const onRegister = (
    email: string,
    password: string,
    fullName: string,
    name: string,
) => async (dispatch: Dispatch<TFetchRegister>) => {
    dispatch({ type: ACTIONTYPES.REGISTERING } as const);
    const cryptoPass = sha1(password).toString();

    const registerObject = {
        email,
        password: cryptoPass,
        fullName,
        name
    };

    postItems({
        endpoint: registerEndpoint(),
        body: registerObject
    })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.REGISTERING_SUCCESS,
                response
            });
        })
        .catch((error) => {
            return dispatch({
                type: ACTIONTYPES.REGISTERING_ERROR,
                errorMessage: error.message
            });
        })
};

export const onLogout = () => async (dispatch: Dispatch<TFetchLogout>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_LOGOUT } as const);
    fetchItems({
        endpoint: logoutEndpoint()
    })
        .then(() => {
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

export const onClearErrors = () => async (dispatch: Dispatch<TClearErrors>) => {
    dispatch({ type: ACTIONTYPES.CLEAR_ERRORS } as const);
};