import dotenv from 'dotenv'
import http from 'http'
import app from './app'
import logger from './utilities/logger'
import { development, test } from '../config/config'

dotenv.config()
const appName = 'userservice'
// process.env.NODE_CONFIG_DIR = '../config'

const bootstrap = async () => {
    let { port } = development
    if (process.env.NODE_ENV === 'test') {
        port = test.port
    }

    try {
        http.createServer(app).listen(port, () => {
            logger.info(`${appName} is running, service started on ${port}`)
        })
    } catch (error) {
        logger.error(error)
    }
}

export default bootstrap
