import * as ACTIONTYPES from 'store/actiontypes';

export type TState = {
  error: boolean;
  errorMessage: string;
  loading: boolean;
  user: TUser | null;
};

export type TAction = {
  type: string;
  response?: TUser;
  errorMessage?: string;
  status?: number;
  notificationMessage?: string;
};

export type TUser = {
  id: string;
  icon: string;
  color: string;
  fullName: string;
  name: string;
  email: string;
  loggedUser?: TUser;
  status: number;
};

export type TFetchLogin = TAction & {
  readonly type:
    | typeof ACTIONTYPES.FETCHING_LOGIN
    | typeof ACTIONTYPES.FETCHING_LOGIN_SUCCESS
    | typeof ACTIONTYPES.FETCHING_LOGIN_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
  readonly user?: TUser;
};

export type TFetchRegister = TAction & {
  readonly type:
    | typeof ACTIONTYPES.REGISTERING
    | typeof ACTIONTYPES.REGISTERING_SUCCESS
    | typeof ACTIONTYPES.REGISTERING_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
  readonly user?: TUser;
};

export type TFetchLogout = TAction & {
  readonly type:
    | typeof ACTIONTYPES.FETCHING_LOGOUT
    | typeof ACTIONTYPES.FETCHING_LOGOUT_SUCCESS
    | typeof ACTIONTYPES.FETCHING_LOGOUT_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TUpdateUser = TAction & {
  readonly type:
    | typeof ACTIONTYPES.UPDATING_USER
    | typeof ACTIONTYPES.UPDATING_USER_SUCCESS
    | typeof ACTIONTYPES.UPDATING_USER_ERROR
    | typeof ACTIONTYPES.UPDATE_PASSWORD_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TClearErrors = TAction & {
  readonly type: typeof ACTIONTYPES.CLEAR_ERRORS;
};
