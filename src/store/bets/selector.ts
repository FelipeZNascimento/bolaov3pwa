import { TState } from './types';

export function selectIsLoading(state: { bets: TState }) {
  return state.bets.loading;
}

export function selectIsUpdating(state: { bets: TState }) {
  return state.bets.updating;
}

export function selectUserBets(state: { bets: TState }) {
  return state.bets.userBets;
}

export function selectExtraBets(state: { bets: TState }) {
  return state.bets.extraBets;
}

export function selectUserExtraBets(state: { bets: TState }) {
  return state.bets.userExtraBets;
}

export function selectExtraBetsResults(state: { bets: TState }) {
  return state.bets.extraBetsResults;
}
export function selectLastUpdatedMatch(state: { bets: TState }) {
  return state.bets.lastUpdatedMatch;
}
