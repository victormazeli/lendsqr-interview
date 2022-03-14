/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import bcrypt from 'bcrypt'
import { uuid } from 'uuidv4'
import logger from '../utilities/logger'
import responses from '../utilities/responses'
import UserRepository from '../repository/user'
import WalletRepository from '../repository/wallet'

/**
 * @description Defines the actions to for the User endpoints
 * @class RegisterController
 */
class RegisterController {
    /**
     *@description Creates a new user
     *@static
     *@param  {Object} req - request
     *@param  {object} res - response
     *@returns {object} - status code, message and created user
     *@memberof RegisterController
     */

    static async newAccount(req, res) {
        const { email, password, fullName } = req.body
        const saltRound = 10

        try {
            const id = uuid()
            const findUser = await UserRepository.findByEmail(email)
            if (findUser[0]) {
                return res
                    .status(400)
                    .json(responses.error(400, 'This account already exist'))
            }
            const genSalt = await bcrypt.genSalt(saltRound)
            const hasPassword = await bcrypt.hash(password, genSalt)
            await UserRepository.create(fullName, email, hasPassword, id)
            const walletId = uuid()
            await WalletRepository.create(walletId, id)
            const getAccount = await UserRepository.getUserAccount(id)
            return res
                .status(201)
                .json(
                    responses.success(
                        201,
                        'Account created successfully',
                        getAccount[0]
                    )
                )
        } catch (error) {
            logger.error(error)
            return res.status(500).json(responses.error(500, 'Server error'))
        }
    }
}

export default RegisterController
