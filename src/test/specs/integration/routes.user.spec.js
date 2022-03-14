process.env.NODE_ENV = 'test'
/* eslint-disable import/first */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import request from 'supertest'
import status from 'http-status'
import mocha from 'mocha'
import chai from 'chai'
import UserAction from '../../actions/routes/user'
import authAction from '../../actions/routes/auth'
import client from '../../../repository/index'

const should = chai.should()

describe('routes testing', () => {
    beforeEach((done) => {
        client.migrate.rollback().then(() => {
            client.migrate.latest().then(() => {
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

    describe('GET Request: /user/account', () => {
        it('get user account', async () => {
            const newAccountPayload = {
                fullName: 'testuser1',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }
            const userlogin = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const { token } = userlogin.body.data
            const res = await UserAction.getUserAcount(token)
            res.status.should.eql(status.OK)
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
            res.body.data.fullName.should.not.eql(null)
            res.body.data.email.should.not.eql(null)
            res.body.data.walletId.should.not.eql(null)
            res.body.data.balance.should.not.eql(null)
        })
        it('should retrun error for none authenticated user', async () => {
            const newAccountPayload = {
                fullName: 'testuser1',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }
            const userlogin = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const { token } = userlogin.body.data
            const res = await UserAction.getUserAcount('')
            res.status.should.eql(status.UNAUTHORIZED)
        })
    })

    describe('POST Request: /fund/wallet', () => {
        it('Fund wallet', async () => {
            const newAccountPayload = {
                fullName: 'testuser1',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }

            const accountLogin = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const token1 = accountLogin.body.data.token
            const amount = 5000
            const res = await UserAction.fundWallet(amount, token1)
            res.status.should.eql(status.OK)
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('id')
            res.body.data.should.have
                .property('fullName')
                .eql(newAccountPayload.fullName)
            res.body.data.should.have
                .property('email')
                .eql(newAccountPayload.email)
            res.body.data.should.have.property('walletId')
            res.body.data.should.have.property('balance').eql(amount)
            res.body.data.fullName.should.not.eql(null)
            res.body.data.email.should.not.eql(null)
            res.body.data.walletId.should.not.eql(null)
            res.body.data.balance.should.not.eql(null)
        })
        it('Should throw an error', async () => {
            const newAccountPayload = {
                fullName: 'testuser1',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }

            const accountLogin = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const token1 = accountLogin.body.data.token
            const amountTofund = 0
            const res = await UserAction.fundWallet(amountTofund, token1)
            const { amount } = res.body.errors[0]
            res.status.should.eql(status.BAD_REQUEST)
            res.body.errors.should.be.a('array')
            amount.should.eql('amount must be greater than 0')
        })
    })
    describe('POST Request: /user/transfer/funds', () => {
        it('transfer funds', async () => {
            const newAccountPayload2 = {
                fullName: 'testuser1',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }
            const account2login = await authAction.login(
                newAccountPayload2.password,
                newAccountPayload2.email
            )
            const token2 = account2login.body.data.token
            const account2 = await UserAction.getUserAcount(token2)
            const account2Wallet = account2.body.data.walletId
            const newAccountPayload = {
                fullName: 'testuser3',
                email: 'testuser3@gmail.com',
                password: 'welcome@1',
            }
            const account1login = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const token1 = account1login.body.data.token
            const amountToTransfer = 1000
            await UserAction.fundWallet(amountToTransfer, token1)
            const res = await UserAction.transferFunds(
                amountToTransfer,
                account2Wallet,
                token1
            )
            res.status.should.eql(status.OK)
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('id')
            res.body.data.should.have
                .property('fullName')
                .eql(newAccountPayload.fullName)
            res.body.data.should.have
                .property('email')
                .eql(newAccountPayload.email)
            res.body.data.should.have.property('walletId')
            res.body.data.should.have.property('balance').eql(0)
            res.body.data.fullName.should.not.eql(null)
            res.body.data.email.should.not.eql(null)
            res.body.data.walletId.should.not.eql(null)
            res.body.data.balance.should.not.eql(null)
        })
        it('should throw an error', async () => {
            const newAccountPayload2 = {
                fullName: 'testuser1',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }
            const account2login = await authAction.login(
                newAccountPayload2.password,
                newAccountPayload2.email
            )
            const token2 = account2login.body.data.token
            const account2 = await UserAction.getUserAcount(token2)
            const account2Wallet = account2.body.data.walletId
            const newAccountPayload = {
                fullName: 'testuser3',
                email: 'testuser3@gmail.com',
                password: 'welcome@1',
            }
            const account1login = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const token1 = account1login.body.data.token
            const amountToTransfer = 0
            await UserAction.fundWallet(amountToTransfer, token1)
            const res = await UserAction.transferFunds(
                amountToTransfer,
                '',
                token1
            )
            const { amount } = res.body.errors[0]
            const { walletId } = res.body.errors[1]
            res.status.should.eql(status.BAD_REQUEST)
            res.body.errors.should.be.a('array')
            amount.should.eql('amount must be greater than 0')
            walletId.should.eql('walletId is required')
        })
    })

    describe('POST Request: /withdraw/funds', () => {
        it('withdraw Fund from wallet', async () => {
            const newAccountPayload = {
                fullName: 'testuser1',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }
            const accountLogin = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const token1 = accountLogin.body.data.token
            const amount = 1000
            await UserAction.fundWallet(amount, token1)
            const res = await UserAction.withdrawFunds(amount, token1)
            res.status.should.eql(status.OK)
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('id')
            res.body.data.should.have
                .property('fullName')
                .eql(newAccountPayload.fullName)
            res.body.data.should.have
                .property('email')
                .eql(newAccountPayload.email)
            res.body.data.should.have.property('walletId')
            res.body.data.should.have.property('balance').eql(0)
            res.body.data.fullName.should.not.eql(null)
            res.body.data.email.should.not.eql(null)
            res.body.data.walletId.should.not.eql(null)
            res.body.data.balance.should.not.eql(null)
        })
        it('should throw an error', async () => {
            const newAccountPayload = {
                fullName: 'testuser1',
                email: 'testuser1@gmail.com',
                password: 'welcome@1',
            }
            const accountLogin = await authAction.login(
                newAccountPayload.password,
                newAccountPayload.email
            )
            const token1 = accountLogin.body.data.token
            const amountToFund = 1000
            const amountToWithdraw = 0
            await UserAction.fundWallet(amountToFund, token1)
            const res = await UserAction.withdrawFunds(amountToWithdraw, token1)
            const { amount } = res.body.errors[0]
            res.status.should.eql(status.BAD_REQUEST)
            res.body.errors.should.be.a('array')
            amount.should.eql('amount must be greater than 0')
        })
    })
})
