import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer';
import thunk from 'redux-thunk';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Provider} from 'react-redux';

import PrivateRoute from './privateRoute';

import Home from './pages/Home';
import Admin from './pages/Admin'
import SignUp from './pages/Signup';
import NavBar from './components/Nav';
import LogIn from './pages/LogIn'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, 
  composeEnhancer(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route path = '/' component = {Home} exact/>
          <PrivateRoute path = '/Admin' component = {Admin} exact/>
          <Route path = '/Signup' component = {SignUp} exact/>
          <Route path = '/LogIn' component ={LogIn} exact />
          <Redirect from = "*" to = "/"/>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
