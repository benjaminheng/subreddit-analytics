import Express from 'express';

const router = Express.Router();

router.get('/periodStats', function(req, res) {
    // TODO: replace placeholder data
    console.log(`start=${req.query.start} end=${req.query.end}`);
    res.json({
        totals: {
            submissions: 10,
            comments: 15,
            uniqueCommenters: 20
        }
    });
});

export default router;