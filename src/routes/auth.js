import { Router } from 'express'
// import { createValidator } from 'express-joi-validation'
import AuthController from '../controllers/auth.controller'
import { validate } from '../middlewares/errorhandlers'
import { authBodySchema } from '../validators/user.schema'

const router = Router()

const { login } = AuthController

router.post('/login', authBodySchema(), validate, login)

export default router
