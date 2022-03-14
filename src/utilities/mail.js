/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import nodeMailer from 'nodemailer'

const sendMail = (data) => {
    let flag = false
    const transport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cfttest728@gmail.com',
            pass: 'Welcome@1',
        },
    })

    transport.sendMail(data, function (err, data) {
        if (err) {
            flag = false
            console.log(err)
        } else {
            flag = true
            console.log('Email sent successfully')
        }
    })

    return flag
}

export default sendMail
