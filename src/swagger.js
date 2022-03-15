import swaggerAutogen from 'swagger-autogen'
import * as dotenv from 'dotenv'
import bootstrap from './server'

dotenv.config()
const doc = {
    info: {
        version: '1.0.0', // by default: '1.0.0'
        title: process.env.APPNAME, // by default: 'REST API'
        description: 'This the documenetation for the Branch service', // by default: ''
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
    host: 'https://lendsqr-int-task.herokuapp.com/', // by default: 'localhost:3000'
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    basePath: '/', // by default: '/'
}

const outputFile = './docs/swagger-output.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
    await bootstrap()
})
