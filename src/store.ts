import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';

// Reducers
import appReducer from './store/app/reducer';
import betsReducer from './store/bets/reducer';
import matchesReducer from './store/matches/reducer';
import userReducer from './store/user/reducer';
import recordsReducer from './store/records/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  bets: betsReducer,
  matches: matchesReducer,
  user: userReducer,
  records: recordsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
