import * as ACTIONTYPES from 'store/actiontypes';

export type TState = {
  error: boolean;
  errorMessage: string;
  loading: boolean;
  week: null | number;
  matches: TMatch[];
};

export type TAction = {
  type: string;
  response?: {
    season: string;
    week: string;
    matches: TMatch[];
  };
  errorMessage?: string;
};

export type TMatchTeam = {
  id: number;
  name: string;
  alias: string;
  code: string;
  possession?: boolean;
  score?: number;
  background: string;
  foreground: string;
  winLosses: string;
};

export type TMatchBet = {
  id: number;
  matchId: number;
  value: number;
  user: {
    color: string;
    icon: string;
    id: number;
    name: string;
  };
};

export type TMatch = {
  id: number;
  timestamp: number;
  status: number;
  away: TMatchTeam;
  home: TMatchTeam;
  bets: TMatchBet[];
  loggedUserBets?: TMatchBet | null;
  clock: string;
  overUnder: string;
  homeTeamOdds: string;
};

export type TFetchMatches = TAction & {
  readonly type:
    | typeof ACTIONTYPES.FETCHING_MATCHES
    | typeof ACTIONTYPES.FETCHING_MATCHES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_MATCHES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
  readonly response?: {
    season: string;
    week: string;
    matches: TMatch[];
  };
};
