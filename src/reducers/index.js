import appReducers from './appReducers';
import homeReducers from './homeReducers';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appReducers,
  homeReducers,
  routing
});

export default rootReducer;
