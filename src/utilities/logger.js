import { createLogger, format, transports } from 'winston'
import appRoot from 'app-root-path'

const { combine, timestamp, printf, align } = format

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
}

const logger = createLogger({
    format: combine(
        timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
        align(),
        printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console),
    ],
    exitOnError: false,
})

logger.stream = {
    write(message) {
        logger.info(message)
    },
}

export default logger
