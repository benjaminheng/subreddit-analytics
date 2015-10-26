const config = {
    isProduction: process.env.NODE_ENV === 'production',
    database: {
        connection: {
            host: 'localhost',
            database: 'subreddit-analytics',
            port: 5432,
            user: 'Ben',
            password: process.env.DB_PASSWORD
        }
    }
}

export default config;
