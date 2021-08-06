import { Dispatch } from 'react';
import sha1 from 'crypto-js/sha1';
import * as ACTIONTYPES from 'store/actiontypes';
import fetchItems from 'services/dataGetters';
import postItems from 'services/dataSetters';
import {
    login as loginEndpoint,
    logout as logoutEndpoint,
    register as registerEndpoint,
    userUpdate as userUpdateEndpoint,
    userUpdatePreferences as userUpdatePreferencesEndpoint,
} from 'services/endpoints';
import faIconsList from 'services/font-awesome';
import { randomHexColorGenerator } from 'services/helpers';

import {
    TClearErrors,
    TFetchLogin,
    TFetchLogout,
    TFetchRegister,
    TUpdateUser
} from './types';

import { STATUS as NOTIFICATION_STATUS } from 'components/notification/status';

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
                const errorMessage = 'Login e/ou senha incorretos';
                dispatch({
                    type: ACTIONTYPES.FETCHING_LOGIN_ERROR,
                    errorMessage
                });

                return dispatch({
                    type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                    status: NOTIFICATION_STATUS.INFO,
                    notificationMessage: errorMessage
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_LOGIN_ERROR,
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

export const onRegister = (
    email: string,
    password: string,
    fullName: string,
    name: string,
) => async (dispatch: Dispatch<TFetchRegister>) => {
    dispatch({ type: ACTIONTYPES.REGISTERING } as const);
    const cryptoPass = sha1(password).toString();
    const randomIcon = faIconsList[Math.floor(Math.random() * faIconsList.length)];
    const randomColor = randomHexColorGenerator();

    const registerObject = {
        email,
        password: cryptoPass,
        fullName,
        name,
        icon: randomIcon,
        color: randomColor
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
            dispatch({
                type: ACTIONTYPES.REGISTERING_ERROR,
                errorMessage: error.message
            });

            if (error.message !== '' && error.message !== undefined) {
                return dispatch({
                    type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                    status: NOTIFICATION_STATUS.INFO,
                    notificationMessage: error.message
                });
            }
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
            if (error.message !== '' && error.message !== undefined) {
                return dispatch({
                    type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                    errorMessage: error.message
                });
            }
        })
};

export const onUpdateUserPreferences = (
    icon: string,
    color: string
) => async (dispatch: Dispatch<TUpdateUser>) => {
    dispatch({ type: ACTIONTYPES.UPDATING_USER } as const);
    const userInfo = {
        icon,
        color
    };

    postItems({
        endpoint: userUpdatePreferencesEndpoint(),
        body: userInfo
    })
        .then((response) => {
            dispatch({
                type: ACTIONTYPES.UPDATING_USER_SUCCESS,
                response: response.user
            });

            dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                status: NOTIFICATION_STATUS.SUCCESS,
                notificationMessage: 'Perfil alterado com sucesso'
            });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.UPDATING_USER_ERROR,
                errorMessage: error.message
            });

            if (error.message !== '' && error.message !== undefined) {
                return dispatch({
                    type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                    status: NOTIFICATION_STATUS.INFO,
                    notificationMessage: error.message
                });
            }
        })

}

export const onUpdateUser = (
    email: string,
    newPassword: string,
    password: string,
    fullName: string,
    name: string,
) => async (dispatch: Dispatch<TUpdateUser>) => {
    dispatch({ type: ACTIONTYPES.UPDATING_USER } as const);

    const userInfo = {
        email,
        newPassword: newPassword ? sha1(newPassword).toString() : null,
        password: password ? sha1(password).toString() : null,
        fullName,
        name
    };

    postItems({
        endpoint: userUpdateEndpoint(),
        body: userInfo
    })
        .then((response) => {
            if (response.changedUser) {
                dispatch({
                    type: ACTIONTYPES.UPDATING_USER_SUCCESS,
                    response: response.user
                });
            }

            if (newPassword && !response.changedPassword) {
                dispatch({
                    type: ACTIONTYPES.UPDATE_PASSWORD_ERROR
                });
            }

            if (response.changedPassword || response.changedUser) {
                dispatch({
                    type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                    status: NOTIFICATION_STATUS.SUCCESS,
                    notificationMessage: 'Perfil alterado com sucesso'
                });
            }

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.UPDATING_USER_ERROR,
                errorMessage: error.message
            });

            if (error.message !== '' && error.message !== undefined) {
                return dispatch({
                    type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                    status: NOTIFICATION_STATUS.INFO,
                    notificationMessage: error.message
                });
            }
        })
};

export const onClearErrors = () => async (dispatch: Dispatch<TClearErrors>) => {
    dispatch({ type: ACTIONTYPES.CLEAR_ERRORS } as const);
};