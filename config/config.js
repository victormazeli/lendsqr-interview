/* eslint-disable no-unused-vars */
require('dotenv').config()

module.exports = {
    development: {
        jwtSecret: process.env.JWT_TOKEN_SECRET,
        database: process.env.DATABASE,
        dbPort: process.env.DB_PORT,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,
        dbHost: process.env.DB_HOST,
        dbClient: process.env.DB_CLIENT,
        port: process.env.PORT,
    },
    test: {
        database: process.env.TEST_DATABASE,
        dbPort: process.env.TEST_DB_PORT,
        dbUser: process.env.TEST_DB_USER,
        dbPassword: process.env.TEST_DB_PASSWORD,
        dbHost: process.env.TEST_DB_HOST,
        dbClient: process.env.TEST_DB_CLIENT,
        port: process.env.TEST_PORT,
    },
    production: {
        databaseUrl: process.env.CLEARDB_DATABASE_URL,
        dbClient: process.env.DB_CLIENT,
    },
}
