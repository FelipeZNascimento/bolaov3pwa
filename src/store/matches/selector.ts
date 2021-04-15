import { TState } from './types';

export function selectMatches(state: { matches: TState }) {
    return state.matches.matches;
}
