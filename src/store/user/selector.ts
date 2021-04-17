import { TState } from './types';

export function selectIsLoading(state: { user: TState }) {
    return state.user.loading;
}

export function selectUser(state: { user: TState }) {
    return state.user.user;
}
