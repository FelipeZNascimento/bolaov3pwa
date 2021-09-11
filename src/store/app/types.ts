import * as ACTIONTYPES from 'store/actiontypes';

export type TState = {
    currentSeason: number | null;
    currentWeek: number | null;
    error: boolean;
    errorMessage: string;
    loading: boolean;
    notifications: TNotification[];
    ranking: TRankingLine[];
    seasonRanking: TRankingLine[];
    seasonStart: number | null;
    teams: TTeam[];
    teamsByConferenceAndDivision: TTeams;
};

export type TTeam = {
    id: number;
    name: string;
    alias: string;
    conference: string;
    division: string;
    code: string;
    background: string;
    foreground: string;
    winLosses: string;
};

export type TConference = {
    north: TTeam[];
    east: TTeam[];
    south: TTeam[];
    west: TTeam[];
}

type TTeams = {
    afc: TConference,
    nfc: TConference
}

type TConfig = {
    currentSeason: number;
    currentWeek: number;
    seasonStart: string;
    teamsByConferenceAndDivision: TTeams;
    teams: TTeam[];
}

export type TRankingLine = {
    color: string;
    icon: string;
    id: number;
    isOnline: boolean;
    name: string;
    position: number;
    totalBullseye: number;
    totalPercentage: number;
    totalPoints: number;
    totalWinners: number;
    totalExtras?: number;
}

export type TNotification = {
    errorMessage?: string;
    id?: string;
    message?: string;
    status?: null | number;
    notificationMessage?: string;
}

export type TAction = TNotification & {
    type: string;
}

export type TFetchConfig = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_LOGIN
    | typeof ACTIONTYPES.FETCHING_LOGIN_SUCCESS
    | typeof ACTIONTYPES.FETCHING_LOGIN_ERROR
    | typeof ACTIONTYPES.FETCHING_CONFIG
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
    readonly ranking?: TRankingLine[];
};

export type TSetWeek = TAction & {
    readonly type: typeof ACTIONTYPES.SET_CURRENT_WEEK;
    week: number;
};

export type TClearNotification = TAction & {
    readonly type: typeof ACTIONTYPES.CLEAR_NOTIFICATION;
    id: string;
};
