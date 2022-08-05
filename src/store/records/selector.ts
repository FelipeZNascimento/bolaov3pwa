import { TState } from './types';

export function selectIsLoading(state: { records: TState }) {
  return state.records.loading;
}

export function selectRecords(state: { records: TState }) {
  return state.records.records;
}
