import Express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
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
app.use(handleRender);

function handleRender(req, res) {
    // Compile an initial state
    // TODO: temporary, do API calls to get this instead.
    const initialState = {
        periods: {
            'All time': {
                totals: {
                    submissions: 1000,
                    comments: 5000
                }
            }
        },
        earliestDate: '2 February 2015'
    };

    // Create a new Redux store instance
    const store = configureStore(initialState);

    // Render the component to a string
    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, initialState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>/r/Singapore Stats</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}


app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});