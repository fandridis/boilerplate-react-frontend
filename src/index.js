import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
// import registerServiceWorker from "./registerServiceWorker";
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
import App from "./App";

// Global CSS
import "./index.css";

// Importing all the reducers to pass in the store
import reducers from './reducers';

// Enabling Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 1st arg: all the reducers
// 2nd arg: initial state (optional)
// 3rd arg of our store: the middleaware
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(reduxThunk)
  ));

// registerServiceWorker();
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Router>
  </Provider>, 
  document.querySelector('#root')
);
