/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import logger from '../utilities/logger'
import responses from '../utilities/responses'
import UserRepository from '../repository/user'
import WalletRepository from '../repository/wallet'

class UserContoller {
    /**
     *@description Get all Users in the database
     *@static
     *@param  {Object} req - request
     *@param  {object} res - response
     *@returns {object} - status code, message and get all Users
     *@memberof UserContoller
     */
    static async getUserAccount(req, res) {
        const { id } = req.user
        try {
            const getAccount = await UserRepository.getUserAccount(id)
            if (getAccount === []) {
                return res
                    .status(404)
                    .json(responses.error(404, 'Account not Found'))
            }

            return res
                .status(200)
                .json(
                    responses.success(
                        200,
                        'Account successfully retrieved',
                        getAccount[0]
                    )
                )
        } catch (error) {
            logger.error(error)
            return res.status(500).json(responses.error(500, 'Server error'))
        }
    }

    /**
     *@description Get a user from database
     *@static
     *@param  {Object} req - request
     *@param  {object} res - response
     *@returns {object} - status code, message and fetched user
     *@memberof UserContoller
     */
    static async fundWallet(req, res) {
        const { id } = req.user
        const { amount } = req.body
        try {
            const findWallet = await WalletRepository.findByUserId(id)
            const addUpAmount = findWallet[0].balance + amount
            await WalletRepository.update(findWallet[0].id, addUpAmount)
            const getAccount = await UserRepository.getUserAccount(id)
            return res
                .status(200)
                .json(
                    responses.success(
                        200,
                        'Funds successfully Added',
                        getAccount[0]
                    )
                )
        } catch (error) {
            logger.error(error)
            return res.status(500).json(responses.error(500, 'Server error'))
        }
    }

    /**
     *@description Get a user by email
     *@static
     *@param  {Object} req - request
     *@param  {object} res - response
     *@returns {object} - status code, message and fetched user
     *@memberof UserContoller
     */
    static async transferFund(req, res) {
        const { id } = req.user
        const { amount, walletId } = req.body

        try {
            const findWallet = await WalletRepository.findById(walletId)
            if (!findWallet[0]) {
                return res
                    .status(400)
                    .json(responses.error(400, 'WalletId does not exist'))
            }
            const addUpAmount = findWallet[0].balance + amount
            await WalletRepository.update(findWallet[0].id, addUpAmount)
            // subtract amount from user wallet
            const getUserWallet = await WalletRepository.findByUserId(id)
            const subtractAmount = getUserWallet[0].balance - amount
            await WalletRepository.update(getUserWallet[0].id, subtractAmount)
            const getAccount = await UserRepository.getUserAccount(id)

            return res
                .status(200)
                .json(
                    responses.success(
                        200,
                        'Funds transfered successfully',
                        getAccount[0]
                    )
                )
        } catch (error) {
            logger.error(error)
            return res.status(500).json(responses.error(500, 'Server error'))
        }
    }

    /**
     *@description Get a User by OTP code
     *@static
     *@param  {Object} req - request
     *@param  {object} res - response
     *@returns {object} - status code, message and fetched user
     *@memberof UserContoller
     */
    static async withdrawfunds(req, res) {
        const { id } = req.user
        const { amount } = req.body

        try {
            const findWallet = await WalletRepository.findByUserId(id)
            const addUpAmount = findWallet[0].balance - amount
            await WalletRepository.update(findWallet[0].id, addUpAmount)
            const getAccount = await UserRepository.getUserAccount(id)

            return res
                .status(200)
                .json(
                    responses.success(
                        200,
                        'Withdrawal successfully completed',
                        getAccount[0]
                    )
                )
        } catch (error) {
            logger.error(error)
            return res.status(500).json(responses.error(500, 'Server error'))
        }
    }
}

export default UserContoller
