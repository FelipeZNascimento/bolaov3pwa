import { TState } from './types';

export function selectIsLoading(state: { bets: TState }) {
    return state.bets.loading;
}

export function selectUserBets(state: { bets: TState }) {
    return state.bets.userBets;
}

export function selectExtraBets(state: { bets: TState }) {
    return state.bets.extraBets;
}

export function selectExtraBetsResults(state: { bets: TState }) {
    return state.bets.extraBetsResults;
}
