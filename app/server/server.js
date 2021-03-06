import Express from 'express';
import path from 'path';
import React from 'react';
import config from '../../config';
import apiRoutes from './api/routes';

const app = new Express();
const port = 3000;

if (!config.isProduction) {
    const devMiddleware = require('./devMiddleware');
    app.use(devMiddleware());
}

const publicPath = path.join(__dirname, '..', '..', 'dist');
app.use(Express.static(publicPath));

app.use('/api', apiRoutes);
app.get("*", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
