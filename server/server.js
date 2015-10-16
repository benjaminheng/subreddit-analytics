import Express from 'express';
import path from 'path';

const app = new Express();
const port = 3000;

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