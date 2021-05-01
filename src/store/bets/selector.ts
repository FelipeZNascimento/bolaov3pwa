import { TState } from './types';

export function selectIsLoading(state: { bets: TState }) {
    return state.bets.loading;
}

export function selectUserBets(state: { bets: TState }) {
    return state.bets.userBets;
}
