import knex from 'knex';
import bookshelf from 'bookshelf';

const config = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        database: 'subreddit-analytics',
        user: 'Ben',
        password: process.env.DB_PASSWORD
    }
});
export default bookshelf(config);
