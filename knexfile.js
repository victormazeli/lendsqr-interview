require('dotenv').config()
const { development, test } = require('./config/config')
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: development.dbClient,
        connection: {
            database: development.database,
            user: development.dbUser,
            password: development.dbPassword,
            host: development.dbHost,
            port: development.dbPort,
        },
        migrations: {
            directory: `${__dirname}/migrations`,
        },
        seeds: {
            directory: `${__dirname}/seeds`,
        },
    },

    test: {
        client: test.dbClient,
        connection: {
            database: test.database,
            user: test.dbUser,
            password: test.dbPassword,
            host: test.dbHost,
            port: test.dbPort,
        },
        migrations: {
            directory: `${__dirname}/migrations`,
        },
        seeds: {
            directory: `${__dirname}/seeds`,
        },
    },

    production: {
        client: development.dbClient,
        connection: {
            database: development.database,
            user: development.dbUser,
            password: development.dbPassword,
            host: development.dbHost,
            port: development.dbPort,
        },
        migrations: {
            directory: `${__dirname}/migrations`,
        },
        seeds: {
            directory: `${__dirname}/seeds`,
        },
    },
}
