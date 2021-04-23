import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reportWebVitals from './reportWebVitals';
import authReducer from './store/reducers/auth';
import forumReducer from './store/reducers/floors';
import floorReducer from './store/reducers/floor';
import threadReducer from './store/reducers/thread';
import commentReducer from './store/reducers/comment';
import thunk from 'redux-thunk';


const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  forum: forumReducer,
  floor: floorReducer,
  thread: threadReducer,
  comment: commentReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider
  store={store}>
  <BrowserRouter>
     <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
