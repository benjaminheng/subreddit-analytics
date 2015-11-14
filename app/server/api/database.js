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
            console.log('api.getTotalStats error -> ' + err);
        });
    });
}

export function getGlobalStats() {
    const currentTime = (new Date).getTime() / 1000;
    return new Promise((resolve, reject) => {
        Promise.all([
            getTotalSubmissions(0, currentTime),
            getTotalComments(0, currentTime)
        ]).then(values => {
            resolve({
                submissions: parseInt(values[0]),
                comments: parseInt(values[1])
            });
        }).catch(err => {
            console.log('api.getGlobalStats error -> ' + err);
        });
    });
}
