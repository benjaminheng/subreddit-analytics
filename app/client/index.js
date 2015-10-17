import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore'
import rootReducer from '../common/reducers';
import App from '../common/containers/App';

const store = configureStore();
const rootElement = document.getElementById('root');

render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    rootElement
);