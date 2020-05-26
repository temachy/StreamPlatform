const winston = require('winston')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

logger.error('Some error occurs when fetching data')
logger.info('User data was fetched successfuly')
logger.info('lorem insum dolor set amet')
logger.error('Some error occurs when fetching data')
logger.info('User data was fetched successfuly')
logger.info('User data was fetched successfuly')
logger.error('Some error occurs when fetching data')

module.exports = logger
