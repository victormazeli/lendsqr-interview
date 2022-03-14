process.env.NODE_ENV = 'test'
/* eslint-disable import/first */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import request from 'supertest'
import status from 'http-status'
import mocha from 'mocha'
import chai from 'chai'
import { uuid } from 'uuidv4'
import bycrypt from 'bcrypt'
import UserAction from '../../actions/routes/user'
import authAction from '../../actions/routes/auth'
import userPayload from '../../testData/payloadData'
import client from '../../../repository/index'

const should = chai.should()

describe('routes testing', () => {
    beforeEach((done) => {
        client.migrate.rollback().then(() => {
            client.migrate.latest().then(async () => {
                client.seed.run().then(() => {
                    done()
                })
            })
        })
    })

    afterEach((done) => {
        client.migrate.rollback().then(() => {
            done()
        })
    })
    describe('POST Request: /auth/login', () => {
        it('authenticate a user ', async () => {
            const newAccountPayload = {
                fullName: 'testUser',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }
            const res = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            res.status.should.eql(status.OK)
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('token')
        })
        it('should return an error ', async () => {
            const newAccountPayload = {
                fullName: 'testUser',
                email: 'testuser1',
                password: 'welcom',
            }
            const res = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const { email } = res.body.errors[0]
            const { password } = res.body.errors[1]
            res.status.should.eql(status.BAD_REQUEST)
            res.body.errors.should.be.a('array')
            email.should.eql('must be an email')
            password.should.eql('must be at least 8 chars long')
        })
    })
})
