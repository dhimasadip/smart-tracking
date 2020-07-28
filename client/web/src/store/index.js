import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import historyReducer from './reducers/historyReducer.js';
import currentReducer from './reducers/currentReducer.js';

const reducers = combineReducers({
  historyReducer,
  currentReducer
})

const store = createStore(reducers, applyMiddleware(thunk, logger))

export default store;
