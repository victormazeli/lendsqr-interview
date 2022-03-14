import { check } from 'express-validator'

const userBodySchema = () => {
    return [
        check('fullName', 'Full Name is required')
            .not()
            .isEmpty()
            .isLength({ max: 50 })
            .withMessage('maximum length should be 50 char'),
        check('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('must be an email'),
        check('password')
            .isLength({ min: 8 })
            .withMessage('must be at least 8 chars long'),
    ]
}

const fundsBodySchema = () => {
    return [
        check('amount', 'Amount is required')
            .not()
            .isEmpty()
            .isInt({ gt: 0 })
            .withMessage('amount must be greater than 0'),
    ]
}

const tranxFundsBodySchema = () => {
    return [
        check('amount', 'Amount is required')
            .not()
            .isEmpty()
            .isInt({ gt: 0 })
            .withMessage('amount must be greater than 0'),
        check('walletId', 'walletId is required').not().isEmpty(),
    ]
}

const authBodySchema = () => {
    return [
        check('email', 'Email is required')
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage('must be an email'),
        check('password', 'Password is required')
            .not()
            .isEmpty()
            .isLength({ min: 8 })
            .withMessage('must be at least 8 chars long'),
    ]
}

export { userBodySchema, fundsBodySchema, tranxFundsBodySchema, authBodySchema }
