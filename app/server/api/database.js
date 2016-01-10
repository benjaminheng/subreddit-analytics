import bookshelf from './bookshelf';

const BETWEEN_QUERY = 'extract(epoch from posted) > ? AND extract(epoch from posted) < ?';

var Comment = bookshelf.Model.extend({
    tableName: 'comment'
});

var Comments = bookshelf.Collection.extend({
    model: Comment
});

var Submission = bookshelf.Model.extend({
    tableName: 'submission'
});

var Submissions = bookshelf.Collection.extend({
    model: Submission
});

function getTotalComments(start, end) {
    const qb = Comments.query();
    qb.whereRaw(BETWEEN_QUERY, [start, end]).count().first();
    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result.count);
        });
    });
}

function getTotalSubmissions(start, end) {
    const qb = Submissions.query();
    qb.whereRaw(BETWEEN_QUERY, [start, end]).count().first();
    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result.count);
        });
    });
}

function getUniqueCommenters(start, end) {
    const qb = Comments.query();
    // SELECT count(*) FROM (SELECT DISTINCT author FROM comment) AS temp
    qb.count().from(function() {
        this.distinct('author').from('comment')
        .whereRaw(BETWEEN_QUERY, [start, end])
        .as('temp');
    })
    .first();
    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result.count);
        });
    });
}

function getTopCommentersByPosts(start, end, limit) {
    const qb = Comments.query();
    // SELECT count(*), author FROM comment WHERE <BETWEEN_QUERY>
    // GROUP BY author ORDER BY count(*) DESC LIMIT <LIMIT>
    qb.select(bookshelf.knex.raw('author, count(*)'))
    .from('comment')
    .whereRaw(BETWEEN_QUERY, [start, end])
    .groupBy('author')
    .orderBy(bookshelf.knex.raw('count(*)'), 'desc')
    .limit(limit);

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

function getTopCommentersByScore(start, end, limit) {
    const qb = Comments.query();
    qb.select(bookshelf.knex.raw('author, sum(score) as count'))
    .from('comment')
    .whereRaw(BETWEEN_QUERY, [start, end])
    .groupBy('author')
    .orderBy(bookshelf.knex.raw('sum(score)'), 'desc')
    .limit(limit);

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

// Comment distribution by hour of day
function getCommentDistributionByTime(start, end) {
    /* SELECT date_part('hour', datehour) AS hour, FLOOR(AVG(count)) AS count 
     * FROM (
     *  SELECT date_trunc('hour', posted) AS datehour, count(*) AS count 
     *  FROM comment 
     *  WHERE posted > (now() - $1::interval) 
     *  GROUP BY date_trunc('hour', posted)
     * ) as temp
     * GROUP BY date_part('hour', datehour) 
     * ORDER BY date_part('hour', datehour)
     */
    const qb = Comments.query();
    qb.select(bookshelf.knex.raw("date_part('hour', datehour) as hour, floor(avg(count)) as count"))
    .from(function() {
        this.select(bookshelf.knex.raw("date_trunc('hour', posted) as datehour, count(*) as count"))
        .from('comment')
        .whereRaw(BETWEEN_QUERY, [start, end])
        .groupBy(bookshelf.knex.raw("date_trunc('hour', posted)"))
        .as('temp');
    })
    .groupBy(bookshelf.knex.raw("date_part('hour', datehour)"))
    .orderBy(bookshelf.knex.raw("date_part('hour', datehour)"));

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

// Comment distribution by day of week
function getCommentDistributionByDay(start, end) {
    /* SELECT date_part('dow', dateday) AS day, FLOOR(AVG(count)) AS count 
     * FROM (
     *  SELECT date(posted) as dateday, count(*) AS count 
     *  FROM comment 
     *  WHERE posted > (now() - $1::interval) 
     *  GROUP BY date(posted)
     * ) as temp 
     * GROUP BY date_part('dow', dateday) 
     * ORDER BY date_part('dow', dateday) 
     */
    const qb = Comments.query();
    qb.select(bookshelf.knex.raw("date_part('dow', dateday) AS day, FLOOR(AVG(count)) AS count"))
    .from(function() {
        this.select(bookshelf.knex.raw("date(posted) as dateday, count(*) AS count"))
        .from('comment')
        .whereRaw(BETWEEN_QUERY, [start, end])
        .groupBy(bookshelf.knex.raw("date(posted)"))
        .as('temp');
    })
    .groupBy(bookshelf.knex.raw("date_part('dow', dateday)"))
    .orderBy(bookshelf.knex.raw("date_part('dow', dateday)"));

    return new Promise((resolve, reject) => {
        qb.then(result => {
            const mapping = {
                0: 'Sunday', 
                1: 'Monday', 
                2: 'Tuesday',
                3: 'Wednesday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday'
            }
            result.map(item => {
                item.day = mapping[item.day];
            });
            resolve(result);
        });
    });
}

function getGildedComments(start, end, limit) {
    const qb = Comments.query();
    qb.whereRaw(BETWEEN_QUERY, [start, end])
    .where('gilded', '>', 0)
    .orderBy('gilded', 'desc')
    .orderBy('score', 'desc')
    .limit(limit);

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

function getGildedSubmissions(start, end, limit) {
    const qb = Submissions.query();
    qb.whereRaw(BETWEEN_QUERY, [start, end])
    .where('gilded', '>', 0)
    .orderBy('gilded', 'desc')
    .orderBy('score', 'desc')
    .limit(limit);

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

// Total comments per month
export function getCommentsPerMonth(start, end) {
    /* select date_trunc('month', posted) as order, 
     *  to_char(date_trunc('month', posted), 'Mon-YYYY') as month, 
     *  count(*) 
     * from comment
     * group by date_trunc('month', posted);
     */
    // If period is not 'all time', don't query the database
    if (parseInt(start) !== 0) {
        return new Promise((resolve, reject) => resolve([]));
    }

    const qb = Comments.query();
    qb.select(bookshelf.knex.raw("date_trunc('month', posted) as order, to_char(date_trunc('month', posted), 'Mon-YYYY') as month, count(*)"))
    .groupBy(bookshelf.knex.raw("date_trunc('month', posted)"))
    .orderBy(bookshelf.knex.raw("date_trunc('month', posted)"));

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

export function getTopCommenters(start, end, limit=10) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getTopCommentersByPosts(start, end, limit),
            getTopCommentersByScore(start, end, limit)
        ]).then(values => {
            resolve({
                posts: values[0],
                score: values[1]
            });
        }).catch(err => {
            console.log('[Error] api.getTopCommenters -> ' + err);
        });
    });
}

export function getCommentDistribution(start, end) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getCommentDistributionByTime(start, end),
            getCommentDistributionByDay(start, end)
        ]).then(values => {
            resolve({
                hour: values[0],
                dayOfWeek: values[1]
            });
        }).catch(err => {
            console.log('[Error] api.getCommentDistribution -> ' + err);
        });
    });
}

export function getGilded(start, end, limit=10) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getGildedSubmissions(start, end, limit),
            getGildedComments(start, end, limit)
        ]).then(values => {
            let submissions = values[0];
            let comments = values[1];
            submissions.map(item => item.type = 'submission');
            comments.map(item => item.type = 'comment');
            let posts = submissions.concat(comments);
            // sort descending according to gilded then score
            posts.sort((a, b) => {
                if (a.gilded > b.gilded) {
                    return -1;
                } else if (a.gilded < b.gilded) {
                    return 1;
                } else if (a.score > b.score) {
                    return -1;
                } else if (a.score < b.score) {
                    return 1;
                } else {
                    return 0;
                }
            });
            posts = posts.slice(0, limit);
            resolve({
                posts: posts
            });
        }).catch(err => {
            console.log('[Error] api.getGilded -> ' + err);
        });
    });
}

export function getTotalStats(start, end) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getTotalSubmissions(start, end),
            getTotalComments(start, end),
            getUniqueCommenters(start, end)
        ]).then(values => {
            resolve({
                submissions: parseInt(values[0]),
                comments: parseInt(values[1]),
                commenters: parseInt(values[2])
            });
        }).catch(err => {
            console.log('[Error] api.getTotalStats -> ' + err);
        });
    });
}

export function getGlobalStats() {
    const currentTime = (new Date).getTime() / 1000;
    return new Promise((resolve, reject) => {
        Promise.all([
            getTotalSubmissions(0, currentTime),
            getTotalComments(0, currentTime),
            getEarliestDate(),
            getLatestDate()
        ]).then(values => {
            resolve({
                submissions: parseInt(values[0]),
                comments: parseInt(values[1]),
                earliestDate: parseInt(values[2]),
                latestDate: parseInt(values[3])
            });
        }).catch(err => {
            console.log('[Error] api.getGlobalStats -> ' + err);
        });
    });
}

function getEarliestDate() {
    const qb = Comments.query();
    qb.select(bookshelf.knex.raw('extract(epoch from posted) as date'))
    .orderBy('posted', 'asc').first();

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result.date);
        });
    });
}

function getLatestDate() {
    const qb = Comments.query();
    qb.select(bookshelf.knex.raw('extract(epoch from posted) as date'))
    .orderBy('posted', 'desc').first();

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result.date);
        });
    });
}
