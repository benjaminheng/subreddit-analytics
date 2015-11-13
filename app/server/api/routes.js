import Express from 'express';
import * as database from './database';

const router = Express.Router();

router.get('/totalStats', function(req, res) {
    console.log(`/totalStats -> ' + 'start=${req.query.start} end=${req.query.end}`);
    database.getTotalStats(req.query.start, req.query.end).then(result => {
        console.log('result -> ' + JSON.stringify(result));
        res.json({});
    });
});

router.get('/globalStats', function(req, res) {
    console.log(`/globalStats -> ' + 'start=${req.query.start} end=${req.query.end}`);
    database.getGlobalStats().then(result => {
        res.json(result);
    });
});

export default router;
