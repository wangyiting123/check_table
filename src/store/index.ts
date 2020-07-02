/* eslint-disable import/no-unresolved */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/extensions
import reducers from './reducers';

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk),
);

export default store;
