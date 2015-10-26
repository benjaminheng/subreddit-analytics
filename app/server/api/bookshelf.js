import knex from 'knex';
import bookshelf from 'bookshelf';
import config from '../../../config';

const knexConfig = knex({
    client: 'pg',
    connection: config.database.connection
});
export default bookshelf(knexConfig);
