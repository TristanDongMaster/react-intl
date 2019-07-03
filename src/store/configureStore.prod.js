import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from './middleware/api'
import rootReducer from '../reducers'

export default function configureStore(routerState) {
  return createStore(
    rootReducer,
    compose(
      routerState,
      applyMiddleware(thunk, api)
    ))
}
