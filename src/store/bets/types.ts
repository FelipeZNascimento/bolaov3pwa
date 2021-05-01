import * as ACTIONTYPES from 'store/actiontypes';
import { TMatch } from 'store/matches/types';

export type TState = {
    error: boolean;
    errorMessage: string;
    loading: boolean;
    week: null | number;
    userBets: TMatch[];
};

export type TAction = {
    type: string;
    response?: {
        season: string;
        week: string;
        matches: TMatch[];
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
