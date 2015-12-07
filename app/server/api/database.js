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

function getGildedComments(start, end, limit=10) {
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

function getGildedSubmissions(start, end, limit=10) {
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
            getEarliestDate()
        ]).then(values => {
            resolve({
                submissions: parseInt(values[0]),
                comments: parseInt(values[1]),
                earliestDate: parseInt(values[2])
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
