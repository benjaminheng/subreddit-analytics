import bookshelf from './bookshelf';

const BETWEEN_QUERY = 'extract(epoch from posted) > ? AND extract(epoch from posted) < ?';

const DAY_MAPPING = {
    0: 'Sunday', 
    1: 'Monday', 
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

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

function gildedSort(a, b) {
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
}

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
    /* SELECT date_part('hour', datehour) AS hour, SUM(count) AS count 
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
    qb.select(bookshelf.knex.raw("date_part('hour', datehour) as hour, sum(count) as count"))
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
    /* SELECT date_part('dow', dateday) AS day, SUM(count) AS count 
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
    qb.select(bookshelf.knex.raw("date_part('dow', dateday) AS day, sum(count) as count"))
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
            result.map(item => {
                item.day = DAY_MAPPING[item.day];
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
            posts.sort(gildedSort);
            posts = posts.slice(0, limit);
            resolve({
                count: posts.length,
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

/*  
 *  USER STATS
 */

function getUserTotalSubmissions(username) {
    const qb = Submissions.query();
    qb.whereRaw('lower(author) = lower(?)', [username]).count().first();
    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result.count);
        });
    });
}

function getUserTotalComments(username) {
    const qb = Comments.query();
    qb.whereRaw('lower(author) = lower(?)', [username]).count().first();
    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result.count);
        });
    });
}

function getUserTotalKarma(username) {
    const qbComments = Comments.query();
    qbComments.whereRaw('lower(author) = lower(?)', [username]).sum('score').first();
    const qbSubmissions = Submissions.query();
    qbSubmissions.whereRaw('lower(author) = lower(?)', [username]).sum('score').first();
    const karmaFromComments = new Promise((resolve, reject) => {
        qbComments.then(result => {
            resolve(result.sum ? result.sum : 0);
        });
    });
    const karmaFromSubmissions = new Promise((resolve, reject) => {
        qbSubmissions.then(result => {
            resolve(result.sum ? result.sum : 0);
        });
    });
    return new Promise((resolve, reject) => {
        Promise.all([
            karmaFromComments,
            karmaFromSubmissions
        ]).then(values => {
            resolve(parseInt(values[0]) + parseInt(values[1]));
        });
    });
}

export function getUserTotalStats(username) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getUserTotalSubmissions(username),
            getUserTotalComments(username),
            getUserTotalKarma(username)
        ]).then(values => {
            resolve({
                submissions: parseInt(values[0]),
                comments: parseInt(values[1]),
                karma: parseInt(values[2])
            });
        }).catch(err => {
            console.log('[Error] api.getUserTotalStats -> ' + err);
        });
    });
}

function getUserGildedComments(username) {
    const qb = Comments.query();
    qb.whereRaw('lower(author) = lower(?)', [username])
    .where('gilded', '>', 0)
    .orderBy('gilded', 'desc')
    .orderBy('score', 'desc');

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

function getUserGildedSubmissions(username) {
    const qb = Submissions.query();
    qb.whereRaw('lower(author) = lower(?)', [username])
    .where('gilded', '>', 0)
    .orderBy('gilded', 'desc')
    .orderBy('score', 'desc');

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

export function getUserGilded(username) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getUserGildedSubmissions(username),
            getUserGildedComments(username)
        ]).then(values => {
            let submissions = values[0];
            let comments = values[1];
            submissions.map(item => item.type = 'submission');
            comments.map(item => item.type = 'comment');
            let posts = submissions.concat(comments);
            // sort descending according to gilded then score
            posts.sort(gildedSort);
            resolve({
                count: posts.length,
                posts: posts
            });
        }).catch(err => {
            console.log('[Error] api.getUserGilded -> ' + err);
        });
    });
}

function getUserTopSubmissions(username, limit) {
    const qb = Submissions.query();
    qb.whereRaw('lower(author) = lower(?)', [username])
    .orderBy('score', 'desc')
    .limit(limit);

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

function getUserTopComments(username, limit) {
    const qb = Comments.query();
    qb.whereRaw('lower(author) = lower(?)', [username])
    .orderBy('score', 'desc')
    .limit(limit);

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    });
}

export function getUserTopPosts(username, limit=10) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getUserTopSubmissions(username, limit),
            getUserTopComments(username, limit)
        ]).then(values => {
            resolve({
                submissions: values[0],
                comments: values[1]
            });
        }).catch(err => {
            console.log('[Error] api.getUserTopPosts -> ' + err);
        });
    });
}

export function getUserCommentsPerMonth(username) {
    const qb = Comments.query();
    qb.select(bookshelf.knex.raw("date_trunc('month', posted) as order, to_char(date_trunc('month', posted), 'Mon-YYYY') as month, count(*)"))
    .whereRaw('lower(author) = lower(?)', [username])
    .groupBy(bookshelf.knex.raw("date_trunc('month', posted)"))
    .orderBy(bookshelf.knex.raw("date_trunc('month', posted)"));

    return new Promise((resolve, reject) => {
        qb.then(result => {
            resolve(result);
        });
    }).catch(err => {
        console.log('[Error] api.getUserCommentsPerMonth -> ' + err);
    });
}

function getUserCommentDistributionByTime(username) {
    const qb = Comments.query();
    qb.select(bookshelf.knex.raw("date_part('hour', datehour) as hour, sum(count) as count"))
    .from(function() {
        this.select(bookshelf.knex.raw("date_trunc('hour', posted) as datehour, count(*) as count"))
        .from('comment')
        .whereRaw('lower(author) = lower(?)', [username])
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

function getUserCommentDistributionByDay(username) {
    const qb = Comments.query();
    qb.select(bookshelf.knex.raw("date_part('dow', dateday) AS day, sum(count) AS count"))
    .from(function() {
        this.select(bookshelf.knex.raw("date(posted) as dateday, count(*) AS count"))
        .from('comment')
        .whereRaw('lower(author) = lower(?)', [username])
        .groupBy(bookshelf.knex.raw("date(posted)"))
        .as('temp');
    })
    .groupBy(bookshelf.knex.raw("date_part('dow', dateday)"))
    .orderBy(bookshelf.knex.raw("date_part('dow', dateday)"));

    return new Promise((resolve, reject) => {
        qb.then(result => {
            result.map(item => {
                item.day = DAY_MAPPING[item.day];
            });
            resolve(result);
        });
    });
}

export function getUserCommentDistribution(username) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getUserCommentDistributionByTime(username),
            getUserCommentDistributionByDay(username)
        ]).then(values => {
            resolve({
                hour: values[0],
                dayOfWeek: values[1]
            });
        }).catch(err => {
            console.log('[Error] api.getUserCommentDistribution -> ' + err);
        });
    });
}
