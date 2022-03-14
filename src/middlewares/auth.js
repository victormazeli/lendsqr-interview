/* eslint-disable consistent-return */
import passport from 'passport'

const authGuard = () => passport.authenticate('jwt', { session: false })

export default authGuard
