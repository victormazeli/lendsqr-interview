/* eslint-disable import/no-duplicates */
import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
// import { errors } from 'celebrate'
import routes from './routes/index'
import winston from './utilities/logger'
import { errorHandler, notFound } from './middlewares/errorhandlers'
import logger from './utilities/logger'
import swaggerFiles from '../docs/swagger-output.json'
import applyPassportStrategy from './passport/jwt-strategy'

const app = express()

app.use(express.json())

applyPassportStrategy(passport)
app.use(morgan('combined', { stream: winston.stream }))

app.use(passport.initialize())
app.get('/', (req, res, next) => {
    res.status(200).send('welcome Testing api Health')
    next()
})
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFiles))
app.use(routes)
app.use('*', notFound)
app.use(errorHandler)
// eventBus.receive();

process.on('unhandledRejection', (err) => {
    logger.error(err.message)
})

export default app
