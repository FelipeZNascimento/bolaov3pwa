import * as ACTIONTYPES from 'store/actiontypes';

export type TState = {
    error: boolean;
    errorMessage: string;
    loading: boolean;
    isNotificationOpen: boolean;
    currentSeason: number | null;
    currentWeek: number | null;
};

type TConfig = {
    currentSeason: number;
    currentWeek: number;

}
export type TAction = {
    type: string;
    response?: TConfig;
    errorMessage?: string;
    week?: number;
}


export type TFetchConfig = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_CONFIG
    | typeof ACTIONTYPES.FETCHING_CONFIG_SUCCESS
    | typeof ACTIONTYPES.FETCHING_CONFIG_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: TConfig;
};

export type TSetWeek = TAction & {
    readonly type: typeof ACTIONTYPES.SET_CURRENT_WEEK;
    week: number;
};
