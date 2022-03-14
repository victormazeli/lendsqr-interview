import { Router } from 'express'
import { validate } from '../middlewares/errorhandlers'
import { userBodySchema } from '../validators/user.schema'
import RegisterController from '../controllers/register.contoller'

const router = Router()

const { newAccount } = RegisterController

router.post('/new/account', userBodySchema(), validate, newAccount)

export default router
