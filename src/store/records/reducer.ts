import * as ACTIONTYPES from 'store/actiontypes';
import { TFetchRecords, TState } from './types';

const initialState: TState = {
  error: false,
  errorMessage: '',
  loading: false,
  records: []
};

export default function betsReducer(
  state: TState = initialState,
  action: TFetchRecords
) {
  switch (action.type) {
    case ACTIONTYPES.FETCHING_RECORDS:
      return {
        ...state,
        loading: true,
        errorMessage: '',
        error: false
      };
    case ACTIONTYPES.FETCHING_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        error: false,
        records: action.response
      };
    default:
      return state;
  }
}
