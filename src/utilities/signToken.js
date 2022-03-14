import { sign } from 'jsonwebtoken'
import { development } from '../../config/config'

const signToken = (data) => {
    const Encrypt = development.jwtSecret
    const token = sign(data, Encrypt, { expiresIn: '1800s' })

    return token
}

export default signToken
