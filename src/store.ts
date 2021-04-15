import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import appReducer from './store/main/reducer';
import matchesReducer from './store/matches/reducer';


const rootReducer = combineReducers({
    app: appReducer,
    matches: matchesReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer, composedEnhancer)

export default store;
