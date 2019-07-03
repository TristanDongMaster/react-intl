import history from '../routes/history';
import configureStore from './configureStore';
import {applyMiddleware} from 'redux';
import { routerMiddleware} from 'react-router-redux';


const routerState = applyMiddleware (routerMiddleware (history));
const store = configureStore (routerState);
export default store
