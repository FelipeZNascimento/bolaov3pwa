import * as ACTIONTYPES from 'store/actiontypes';
import { TMatch } from 'store/matches/types';

export type TState = {
    error: boolean;
    errorMessage: string;
    loading: boolean;
    week: null | number;
    userBets: TMatch[];
    extraBetsResults: TExtraBets | null;
    extraBets: TUserExtraBets[];
};

export type TAction = {
    type: string;
    response?: {
        season: string;
        week: string;
        matches: TMatch[];
        results: TExtraBets | null;
        bets: TUserExtraBets[];
    };
    errorMessage?: string;
}
export type TFetchUserBets = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_USER_BETS
    | typeof ACTIONTYPES.FETCHING_USER_BETS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_USER_BETS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: {
        season: string;
        week: string;
        matches: TMatch[];
    };
};

export type TFetchExtraBets = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_EXTRA_BETS
    | typeof ACTIONTYPES.FETCHING_EXTRA_BETS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_EXTRA_BETS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: {
        season: string;
        teams: {
            afc: TConference;
            nfc: TConference;
        };
        results: TExtraBets;
        bets: TUserExtraBets[];
    };
};

type TTeams = {
    id: number;
    name: string;
    alias: string;
    conference: string;
    division: string;
    code: string;
    background: string;
    foreground: string;
};

type TConference = {
    north: TTeams[];
    east: TTeams[];
    south: TTeams[];
    west: TTeams[];
}

type TExtraBets = {
    [n: string]: number | number[];
}

export type TUserExtraBets = {
    userId: number;
    username: string;
    icon: string;
    color: string;
    bets: TExtraBets;
};