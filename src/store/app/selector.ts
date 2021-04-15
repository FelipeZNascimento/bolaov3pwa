import { TState } from './types';

export function selectIsLoading(state: { app: TState }) {
    return state.app.loading;
}

export function selectConfig(state: { app: TState }) {
    return state.app.config;
}
