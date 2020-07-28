import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import historyReducer from './reducers/historyReducer.js';
import currentReducer from './reducers/currentReducer.js';
import userReducer from './reducers/userReducer.js';

const reducers = combineReducers({
  historyReducer,
  currentReducer,
  userReducer

})

const store = createStore(reducers, applyMiddleware(thunk, logger))

export default store;
