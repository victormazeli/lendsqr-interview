/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('wallets', function (table) {
        table.float('balance').defaultTo(0.0)
        table.string('owner')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.uuid('id').primary()
        table.foreign('owner').references('users.id')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('wallets')
}
