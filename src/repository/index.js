import knex from 'knex'
import * as knexConfig from '../../knexfile'

const client = knex(knexConfig[process.env.NODE_ENV])

export default client
