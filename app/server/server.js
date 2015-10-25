import Express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import getDevMiddleware from './getDevMiddleware';
import apiRoutes from './api/routes';

const app = new Express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
    app.use(getDevMiddleware());
}

app.use('/api', apiRoutes);
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
