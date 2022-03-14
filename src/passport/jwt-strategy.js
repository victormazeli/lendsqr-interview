import { Strategy, ExtractJwt } from 'passport-jwt'
import { development } from '../../config/config'
import UserRepository from '../repository/user'

const applyPassportStrategy = (passport) => {
    const options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    options.secretOrKey = development.jwtSecret
    passport.use(
        new Strategy(options, (payload, done) => {
            UserRepository.findById(payload.id).then((user, err) => {
                if (err) return done(err, false)
                if (user) {
                    return done(null, {
                        id: user[0].id,
                    })
                }
                return done(null, false)
            })
        })
    )
}
export default applyPassportStrategy
