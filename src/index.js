import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './_store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import * as action from './_store/actions';

store.dispatch(action.authCheck());


ReactDOM.render(
  <Provider store={store}>
    <ReactNotification />
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
