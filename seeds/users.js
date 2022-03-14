const { uuid } = require('uuidv4')
const bcrypt = require('bcrypt')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    const testuser1 = {
        id: uuid(),
        fullName: 'testuser1',
        email: 'testuser1@gmail.com',
        password: 'welcome@1',
    }
    const saltround1 = await bcrypt.genSalt(10)
    testuser1.password = await bcrypt.hash(testuser1.password, saltround1)
    const testuser2 = {
        id: uuid(),
        fullName: 'testuser2',
        email: 'testuser2@gmail.com',
        password: 'welcome@1',
    }
    const saltround2 = await bcrypt.genSalt(10)
    testuser2.password = await bcrypt.hash(testuser1.password, saltround2)
    const testuser3 = {
        id: uuid(),
        fullName: 'testuser3',
        email: 'testuser3@gmail.com',
        password: 'welcome@1',
    }
    const saltround3 = await bcrypt.genSalt(10)
    testuser3.password = await bcrypt.hash(testuser3.password, saltround3)
    const wallet1 = {
        id: uuid(),
        owner: testuser1.id,
    }
    const wallet2 = {
        id: uuid(),
        owner: testuser2.id,
    }
    const wallet3 = {
        id: uuid(),
        owner: testuser3.id,
    }
    // Deletes ALL existing entries
    await knex('users').del()
    await knex('wallets').del()
    await knex('users').insert([testuser1, testuser2, testuser3])
    await knex('wallets').insert([wallet1, wallet2, wallet3])
}
