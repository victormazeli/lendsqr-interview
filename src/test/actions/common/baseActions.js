/* eslint-disable import/first */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
process.env.NODE_ENV = 'test'

import supertest from 'supertest'
import Headers from '../../testData/defaultHeaders'

// const getBaseURL = () => {
//     let baseURL = ''
//     try {
//         baseURL = process.env.ENVIRONMENT
//         console.log(`BaseURL : ${baseURL}`)
//     } catch (err) {
//         throw new Error(
//             `BASE URL is not Defined, Please Specify the BASE URL : ${process.env.ENVIRONMENT}`
//         )
//     }
//     const BaseURLSpecifications = {
//         BASE_URL: baseURL,
//     }
//     return BaseURLSpecifications.BASE_URL
// }

/** This sendPOSTRequest can be used when you dont need to pass a token while performing a POST operation * */

const sendPOSTRequest = async (baseUrl, apiEndPoint, requestBody) => {
    try {
        const res = await supertest(baseUrl)
            .post(apiEndPoint)
            .retry(2)
            .set(Headers.ACCEPT_JSON)
            .set(Headers.APPLICATION_JSON)
            .send(requestBody)
        return res
    } catch (err) {
        console.log('Error in sending POST Request: ', err)
    }
}

/** This sendPOSTRequest1 can be used when you will be passing a token and body params while performing a POST operation * */

const sendPOSTRequest1 = async (baseUrl, apiEndPoint, requestBody, token) => {
    try {
        const res = await supertest(baseUrl)
            .post(apiEndPoint)
            .retry(2)
            .set(Headers.ACCEPT_JSON)
            .set(Headers.APPLICATION_JSON)
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)
        return res
    } catch (err) {
        console.log('Error in sending POST Request: ', err)
    }
}

/** This sendGETRequest can be used when you will be passing a token while performing a GET operation * */

const sendGETRequest = async (baseUrl, apiEndPoint, token) => {
    try {
        const res = await supertest(baseUrl)
            .get(apiEndPoint)
            .retry(2)
            .set(Headers.ACCEPT_JSON)
            .set(Headers.APPLICATION_JSON)
            .set('Authorization', `Bearer ${token}`)
        return res
    } catch (err) {
        console.log('Error in sending GET Request: ', err)
    }
}

/** This sendPUTRequest can be used when you will be passing a token and body params while performing a PUT operation * */

const sendPUTRequest = async (baseUrl, apiEndPoint, requestBody) => {
    try {
        const res = await supertest(baseUrl)
            .put(apiEndPoint)
            .retry(2)
            .set(Headers.ACCEPT_JSON)
            .set(Headers.APPLICATION_JSON)
            .send(requestBody)
        return res
    } catch (err) {
        console.log('Error in sending PUT Request: ', err)
    }
}

/** This sendDELETERequest can be used when you will be passing a token while performing a DELETE operation * */

const sendDELETERequest = async (baseUrl, apiEndPoint, token) => {
    try {
        const res = await supertest(baseUrl)
            .delete(apiEndPoint)
            .retry(2)
            .set(Headers.ACCEPT_JSON)
            .set(Headers.APPLICATION_JSON)
            .set('Authorization', `Bearer ${token}`)
        return res
    } catch (err) {
        console.log('Error in sending DELETE Request: ', err)
    }
}

export default {
    sendDELETERequest,
    sendGETRequest,
    sendPOSTRequest,
    sendPUTRequest,
    sendPOSTRequest1,
    // getBaseURL,
}
