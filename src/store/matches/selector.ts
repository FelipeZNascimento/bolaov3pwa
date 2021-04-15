import { TState } from './types';

export function selectIsLoading(state: { matches: TState }) {
    return state.matches.loading;
}

export function selectMatches(state: { matches: TState }) {
    return state.matches.matches;
}
