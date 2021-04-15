import { TState } from './types';

export function selectIsLoading(state: { app: TState }) {
    return state.app.loading;
}

export function selectCurrentSeason(state: { app: TState }) {
    return state.app.currentSeason;
}

export function selectCurrentWeek(state: { app: TState }) {
    return state.app.currentWeek;
}
