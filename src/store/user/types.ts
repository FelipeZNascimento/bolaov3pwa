import * as ACTIONTYPES from 'store/actiontypes';

export type TState = {
    error: boolean;
    errorMessage: string;
    loading: boolean;
    user: TUser | null;
};

export type TAction = {
    type: string;
    //     season: number;
    response?: TUser;
    //     week: number;
    //     matches: TMatch[];
    // };
    errorMessage?: string;
};

export type TUser = {
    id: string;
    icon: string;
    color: string;
    fullName: string;
    name: string;
    email: string;
    loggedUser?: TUser;
}
export type TFetchLogin = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_LOGIN
    | typeof ACTIONTYPES.FETCHING_LOGIN_SUCCESS
    | typeof ACTIONTYPES.FETCHING_LOGIN_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly user?: TUser;
};

export type TFetchLogout = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_LOGOUT
    | typeof ACTIONTYPES.FETCHING_LOGOUT_SUCCESS
    | typeof ACTIONTYPES.FETCHING_LOGOUT_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};
