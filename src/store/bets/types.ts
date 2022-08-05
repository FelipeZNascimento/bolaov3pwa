import * as ACTIONTYPES from 'store/actiontypes';
import { TMatch } from 'store/matches/types';

export type TState = {
  error: boolean;
  errorMessage: string;
  loading: boolean;
  week: null | number;
  extraBetsResults: TExtraBets | null;
  extraBets: TUserExtraBets[];
  updating: boolean;
  userBets: TMatch[];
  userExtraBets: TExtraBets | null;
};

export type TAction = {
  type: string;
  status?: number;
  notificationMessage?: string;
};

export type TFetchUserBets = TAction & {
  readonly type:
    | typeof ACTIONTYPES.FETCHING_USER_BETS
    | typeof ACTIONTYPES.FETCHING_USER_BETS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_USER_BETS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
  readonly response?: {
    season: string;
    week: string;
    matches: TMatch[];
  };
  readonly errorMessage?: string;
};

export type TUpdateUserBets = TAction & {
  readonly type:
    | typeof ACTIONTYPES.UPDATING_REGULAR_BET
    | typeof ACTIONTYPES.UPDATING_REGULAR_BET_SUCCESS
    | typeof ACTIONTYPES.UPDATING_REGULAR_BET_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
  readonly response?: {
    season: string;
    week: string;
    matches: TMatch[];
  };
  readonly errorMessage?: string;
};

export type TFetchExtraBets = TAction & {
  readonly type:
    | typeof ACTIONTYPES.FETCHING_EXTRA_BETS
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
    userBets: TExtraBets;
  };
  readonly errorMessage?: string;
};

export type TUpdateExtraBets = TAction & {
  readonly type:
    | typeof ACTIONTYPES.UPDATING_EXTRA_BETS
    | typeof ACTIONTYPES.UPDATING_EXTRA_BETS_SUCCESS
    | typeof ACTIONTYPES.UPDATING_EXTRA_BETS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
  readonly response?: {
    userBets: TExtraBets;
  };
  readonly errorMessage?: string;
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
};

export type TExtraBets = {
  [n: string]: null | number | number[];
};

export type TUserExtraBets = {
  userId: number;
  username: string;
  icon: string;
  color: string;
  bets: TExtraBets;
};
