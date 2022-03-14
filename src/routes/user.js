import { Router } from 'express'
import { validate } from '../middlewares/errorhandlers'
import UserContoller from '../controllers/user.controller'
import authGuard from '../middlewares/auth'
import {
    tranxFundsBodySchema,
    fundsBodySchema,
} from '../validators/user.schema'

const router = Router()

const { getUserAccount, transferFund, withdrawfunds, fundWallet } =
    UserContoller

router.post(
    '/transfer/funds',
    authGuard(),
    tranxFundsBodySchema(),
    validate,
    transferFund
)
router.post(
    '/withdraw/funds',
    authGuard(),
    fundsBodySchema(),
    validate,
    withdrawfunds
)
router.post(
    '/fund/wallet',
    authGuard(),
    fundsBodySchema(),
    validate,
    fundWallet
)
router.get('/account', authGuard(), getUserAccount)

export default router
