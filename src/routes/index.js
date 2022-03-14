import express from 'express'
import userRoutes from './user'
import registerRoutes from './register'
import authRoutes from './auth'

const app = express()

app.use('/user', userRoutes)
app.use('/register', registerRoutes)
app.use('/auth', authRoutes)

export default app
