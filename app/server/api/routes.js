import Express from 'express';
import * as database from './database';

const router = Express.Router();

router.get('/stats', function(req, res) {
    console.log(`/stats -> ' + 'start=${req.query.start} end=${req.query.end}`);
    const start = req.query.start;
    const end = req.query.end;
    Promise.all([
        database.getTotalStats(start, end)
    ]).then(results => {
        res.json({
            totals: results[0]
        });
    }).catch(err => {
        console.log('[Error] GET /stats -> ' + err);
    });
});

router.get('/globalStats', function(req, res) {
    console.log(`/globalStats -> ' + 'start=${req.query.start} end=${req.query.end}`);
    database.getGlobalStats().then(result => {
        res.json(result);
    }).catch(err => {
        console.log('[Error] GET /globalStats -> ' + err);
    });
});

export default router;
