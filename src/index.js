import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import './rxoperator.js';
import './index.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
