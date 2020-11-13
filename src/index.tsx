// TODO: доделать сбору (typescript и т.д)
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './components/app/app';
import {createAPI} from './api';
import {reducer, Operation} from './reducer/data/data';


const api = createAPI(() => console.log('wtf'));
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware.withExtraArgument(api))
);

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
