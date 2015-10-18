import Express from 'express';
import path from 'path';
import getDevMiddleware from './getDevMiddleware';

const app = new Express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
    app.use(getDevMiddleware());
}

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});