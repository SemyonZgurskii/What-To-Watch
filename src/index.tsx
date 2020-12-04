import * as React from 'react';
import * as ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './components/app/app';
import {createAPI} from './api';
import {Operation} from './reducer/data/data';
import reducer from "./reducer/reducer";


const api = createAPI(() => console.log('wtf'));
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware.withExtraArgument(api))
);

store.dispatch(Operation.loadMoviesData());
store.dispatch(Operation.loadPromoMovie());

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
