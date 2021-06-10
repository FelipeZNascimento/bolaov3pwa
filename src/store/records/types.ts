import * as ACTIONTYPES from 'store/actiontypes';
import { TMatch } from 'store/matches/types';

export type TState = {
    error: boolean;
    errorMessage: string;
    loading: boolean;
    records: TRecord[];
};

export type TAction = {
    type: string;
    status?: number;
    notificationMessage?: string;
}

export type TFetchRecords = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_RECORDS
    | typeof ACTIONTYPES.FETCHING_RECORDS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_RECORDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: {
        season: string;
        week: string;
        matches: TMatch[];
    };
    readonly errorMessage?: string;
};

export type TRecord = {
    bullseye: number;
    numOfBets: number;
    numOfGames: number;
    percentage: string;
    points: number;
    seasonId: number;
    userColor: string;
    userIcon: string;
    userId: number;
    userName: string;
    week: number;
    winners: number;
}