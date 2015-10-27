import bookshelf from './bookshelf';

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
    return Comments.forge().count();
}

function getTotalSubmissions(start, end) {
    return Submissions.forge().count();
}

function getUniqueCommenters(start, end) {
    const qb = Comments.query();
    // SELECT count(*) FROM (SELECT DISTINCT author FROM comment) AS temp
    return new Promise((resolve, reject) => {
        qb.count().from(function() {
            this.distinct('author').from('comment').as('temp');
        }).first().then(result => {
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
        });
    });
}
