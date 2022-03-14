// /* eslint-disable no-console */
// import client from 'twilio'
// import config from '../config/constant'
// import logger from './logger'

// const accountSid = config.twilloAcccountSid
// const accountToken = config.twilloToken

// const sms = client(accountSid, accountToken)

// const sendSms = async (message, phone) => {
//     try {
//         const msg = await sms.messages.create({
//             body: message,
//             from: config.twilloPhoneNumber,
//             to: phone,
//         })
//         console.log(msg.sid)
//     } catch (error) {
//         logger.error(error)
//         console.log(error)
//     }
// }

// export default sendSms
