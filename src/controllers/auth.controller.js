/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import bcrypt from 'bcrypt'
import logger from '../utilities/logger'
import responses from '../utilities/responses'
import signToken from '../utilities/signToken'
import UserRepository from '../repository/user'

class AuthController {
    /**
     *@description login User
     *@static
     *@param  {Object} req - request
     *@param  {object} res - response
     *@returns {object} - status code, message and user auth object
     *@memberof RegController
     */
    static async login(req, res) {
        const { email, password } = req.body
        try {
            const user = await UserRepository.findByEmail(email)
            if (!user) {
                return res
                    .status(404)
                    .json(
                        responses.error(
                            404,
                            'user with this email does not exist'
                        )
                    )
            }
            const valid = await bcrypt.compare(password, user[0].password)
            console.log(valid)

            if (!valid) {
                return res
                    .status(400)
                    .json(responses.error(400, 'invalid credentials'))
            }
            const TokenData = {
                id: user[0].id,
            }

            //  Generate Token
            const token = signToken(TokenData)

            return res
                .status(200)
                .json(responses.success(200, 'auth successful', { token }))
        } catch (error) {
            logger.error(error)
            return res.status(500).json(responses.error(500, error))
        }
    }
}

export default AuthController
