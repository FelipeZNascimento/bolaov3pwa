import * as ACTIONTYPES from 'store/actiontypes';

export type TState = {
    error: boolean;
    errorMessage: string;
    loading: boolean;
    matches: TMatch[];
};

export type TAction = {
    type: string;
    response?: {
        season: number;
        week: number;
        matches: TMatch[];
    };
    errorMessage?: string;
}

export type TMatchTeam = {
    id: number;
    name: string;
    alias: string;
    code: string;
    possession: boolean;
    score: number;
    background: string;
    foreground: string;
}

export type TMatch = {
    id: number;
    timestamp: number;
    status: string;
    away: TMatchTeam;
    home: TMatchTeam;
};

export type TFetchMatches = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_MATCHES
    | typeof ACTIONTYPES.FETCHING_MATCHES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_MATCHES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly matches?: TMatch[];
};
