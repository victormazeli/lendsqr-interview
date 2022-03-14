/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { validationResult } from 'express-validator'

export const notFound = (req, res, next) => {
    res.status(404).json({
        message: 'Page not found',
    })
    next()
}

export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

export const errorHandler = (err, req, res, next) => {
    if (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        } // Set 500 server code error if statuscode not set
        return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: err.message,
        })
    }

    next()
}
