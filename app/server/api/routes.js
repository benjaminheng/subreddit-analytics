import Express from 'express';
import * as database from './database';

const router = Express.Router();

router.get('/stats', function(req, res) {
    console.log(`/stats -> ' + 'start=${req.query.start} end=${req.query.end}`);
    const start = req.query.start;
    const end = req.query.end;
    Promise.all([
        database.getTotalStats(start, end),
        database.getTopCommenters(start, end),
        database.getCommentDistribution(start, end),
        database.getGilded(start, end),
        database.getCommentsPerMonth(start, end)
    ]).then(results => {
        res.json({
            totals: results[0],
            topCommenters: results[1],
            distribution: results[2],
            gilded: results[3],
            commentsPerMonth: results[4]
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

router.get('/userStats', function(req, res) {
    const username = req.query.username;
    console.log(`/userStats -> ' + 'username=${username}`);
    Promise.all([
        database.getUserTotalStats(username),
        database.getUserGilded(username),
        database.getUserTopPosts(username),
        database.getUserCommentDistribution(username),
        database.getUserCommentsPerMonth(username)
    ]).then(results => {
        res.json({
            totals: results[0],
            gilded: results[1],
            topPosts: results[2],
            distribution: results[3],
            commentsPerMonth: results[4]
        });
    }).catch(err => {
        console.log('[Error] GET /userStats -> ' + err);
    });
});

export default router;
