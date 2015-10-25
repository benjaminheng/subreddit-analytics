import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore'
import App from '../common/containers/App';

require('../common/stylesheets/main.scss');

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const rootElement = document.getElementById('root');

render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    rootElement
);
