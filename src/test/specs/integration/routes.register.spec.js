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
import UserAction from '../../actions/routes/user'
import authAction from '../../actions/routes/auth'
import userPayload from '../../testData/payloadData'
import client from '../../../repository/index'

const should = chai.should()

describe('routes testing', () => {
    beforeEach((done) => {
        client.migrate.rollback().then(() => {
            client.migrate.latest().then(() => {
                done()
            })
        })
    })

    afterEach((done) => {
        client.migrate.rollback().then(() => {
            done()
        })
    })
    describe('POST Request: /register/new/account', () => {
        it('create new account', async () => {
            const newAccountPayload = {
                fullName: 'testUser',
                email: 'testuser4@gmail.com',
                password: 'welcome@1',
            }
            const res = await authAction.createAccount(
                newAccountPayload.fullName,
                newAccountPayload.password,
                newAccountPayload.email
            )
            res.status.should.eql(status.CREATED)
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('id')
            res.body.data.should.have
                .property('fullName')
                .eql(newAccountPayload.fullName)
            res.body.data.should.have
                .property('email')
                .eql(newAccountPayload.email)
            res.body.data.should.have.property('walletId')
            res.body.data.should.have.property('balance')
        })
        it('should return an error ', async () => {
            const newAccountPayload = {
                fullName: '',
                email: 'testuser4',
                password: 'welcome@1',
            }
            const res = await authAction.createAccount(
                newAccountPayload.fullName,
                newAccountPayload.password,
                newAccountPayload.email
            )
            const { fullName } = res.body.errors[0]
            const { email } = res.body.errors[1]
            res.status.should.eql(status.BAD_REQUEST)
            res.body.errors.should.be.a('array')
            email.should.eql('must be an email')
            fullName.should.eql('Full Name is required')
        })
    })
})
