import { TState } from './types';

export function selectIsLoading(state: { app: TState }) {
  return state.app.loading;
}

export function selectTeams(state: { app: TState }) {
  return state.app.teams;
}
export function selectTeamsByConferenceAndDivision(state: { app: TState }) {
  return state.app.teamsByConferenceAndDivision;
}

export function selectCurrentSeason(state: { app: TState }) {
  return state.app.currentSeason;
}

export function selectCurrentWeek(state: { app: TState }) {
  return state.app.currentWeek;
}

export function selectRanking(state: { app: TState }) {
  return state.app.ranking;
}

export function selectSeasonRanking(state: { app: TState }) {
  return state.app.seasonRanking;
}

export function selectSeasonStart(state: { app: TState }) {
  return state.app.seasonStart;
}

export function selectNotifications(state: { app: TState }) {
  return state.app.notifications;
}
