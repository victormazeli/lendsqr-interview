/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import testdb from "./db/testdb";
import request from 'supertest'
import status from 'http-status'
import baseActions from '../common/baseActions'
import urlMapper from '../../../urMappers'
import app from '../../../app'

const fundWallet = async (amount, token) => {
    const res = baseActions.sendPOSTRequest1(
        app,
        urlMapper.FUND_WALLET,
        {
            amount,
        },
        token
    )
    return res
}

const transferFunds = async (amount, walletId, token) => {
    const res = baseActions.sendPOSTRequest1(
        app,
        urlMapper.TRANSFER_FUNDS,
        {
            amount,
            walletId,
        },
        token
    )
    return res
}

const withdrawFunds = async (amount, token) => {
    const res = baseActions.sendPOSTRequest1(
        app,
        urlMapper.WITHDRAW_FUNDS,
        {
            amount,
        },
        token
    )
    return res
}

const getUserAcount = async (token) => {
    const res = baseActions.sendGETRequest(
        app,
        urlMapper.GET_ACCOUNT_DETAIL,
        token
    )
    return res
}

export default {
    fundWallet,
    withdrawFunds,
    transferFunds,
    getUserAcount,
}
