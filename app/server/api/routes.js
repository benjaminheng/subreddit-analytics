import Express from 'express';
import * as database from './database';

const router = Express.Router();

router.get('/totalStats', function(req, res) {
    // TODO: replace placeholder data
    console.log(`/totalStats -> ' + 'start=${req.query.start} end=${req.query.end}`);
    database.getTotalStats('start', 'end').then(result => {
        console.log('result -> ' + JSON.stringify(result));
        res.json({});
    });
});

export default router;
