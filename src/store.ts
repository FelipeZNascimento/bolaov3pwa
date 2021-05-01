import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

// Reducers
import appReducer from './store/app/reducer';
import betsReducer from './store/bets/reducer';
import matchesReducer from './store/matches/reducer';
import userReducer from './store/user/reducer';

const rootReducer = combineReducers({
    app: appReducer,
    bets: betsReducer,
    matches: matchesReducer,
    user: userReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer, composedEnhancer)

export default store;
