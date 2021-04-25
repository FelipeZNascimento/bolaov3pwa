import * as ACTIONTYPES from 'store/actiontypes';

export type TState = {
    error: boolean;
    errorMessage: string;
    loading: boolean;
    isNotificationOpen: boolean;
    currentSeason: number | null;
    currentWeek: number | null;
    ranking: TRankingLine[];
    seasonRanking: TRankingLine[];
};

type TConfig = {
    currentSeason: number;
    currentWeek: number;
}

export type TRankingLine = {
    color: string;
    icon: string;
    id: number;
    name: string;
    totalBullseye: number;
    totalPercentage: number;
    totalPoints: number;
    totalWinners: number;
    totalExtras?: number;
}

export type TAction = {
    type: string;
    response?: TConfig;
    ranking?: TRankingLine[];
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

export type TFetchRanking = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_RANKING
    | typeof ACTIONTYPES.FETCHING_RANKING_SUCCESS
    | typeof ACTIONTYPES.FETCHING_RANKING_ERROR
    | typeof ACTIONTYPES.FETCHING_SEASON_RANKING
    | typeof ACTIONTYPES.FETCHING_SEASON_RANKING_SUCCESS
    | typeof ACTIONTYPES.FETCHING_SEASON_RANKING_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: TRankingLine[];
};

export type TSetWeek = TAction & {
    readonly type: typeof ACTIONTYPES.SET_CURRENT_WEEK;
    week: number;
};
