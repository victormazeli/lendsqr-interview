/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import testdb from "./db/testdb";
import request from 'supertest'
import status from 'http-status'
import baseActions from '../common/baseActions'
import urlMapper from '../../../urMappers'
import app from '../../../app'

const login = async (password, email) => {
    const res = baseActions.sendPOSTRequest(app, urlMapper.LOGIN, {
        password,
        email,
    })
    return res
}
const createAccount = async (fullName, password, email) => {
    const res = baseActions.sendPOSTRequest(app, urlMapper.CREATE_NEW_ACCOUNT, {
        fullName,
        password,
        email,
    })
    return res
}

export default {
    login,
    createAccount,
}
