import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers'
import './Services/config';
import { ActionCableProvider } from 'react-actioncable-provider';

const API_WS_ACTION_CABLE = global.ACTION_CABLE_URL;

const store = createStore(
  rootReducer,
    applyMiddleware(thunk)

);
ReactDOM.render(
  <React.StrictMode>
         <ActionCableProvider url={API_WS_ACTION_CABLE}>
            <Provider store={store}>
                <App />
            </Provider>
    </ActionCableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
