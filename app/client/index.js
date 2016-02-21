import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import Home from '../common/containers/Home';
import About from '../common/containers/About';
import Users from '../common/containers/users/Users';
import UserIndex from '../common/containers/users/UserIndex';
import User from '../common/containers/users/User';
import NotFound from '../common/containers/NotFound';

require('../common/stylesheets/main.scss');

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="users" component={Users}>
                    <IndexRoute component={UserIndex} />
                    <Route path="/user/:username" component={User} />
                </Route>
                <Route path="about" component={About} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>,
    rootElement
);
