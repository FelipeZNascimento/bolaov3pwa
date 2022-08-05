import { TState } from './types';

export function selectIsLoading(state: { user: TState }) {
  return state.user.loading;
}

export function selectUser(state: { user: TState }) {
  return state.user.user;
}

export function selectErrorMessage(state: { user: TState }) {
  return state.user.errorMessage;
}

export function selectHasError(state: { user: TState }) {
  return state.user.error;
}
