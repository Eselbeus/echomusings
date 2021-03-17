import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import articleReducer from './reducers/articleReducer'
import podcastReducer from './reducers/podcastReducer'

const rootReducer = combineReducers({
  articles: articleReducer,
  podcasts: podcastReducer
})

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))

store.subscribe(throttle(() => {
  saveState({
    articles: store.getState().articles
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
