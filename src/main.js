require('module-alias/register')
const createHttpServer = require('./servers/http')
const config = require('@config')
const logger = require('@logger')
const pool = require('./utils/db')
const {ClientError} = require('utils/error')

;(async function main() {
    const server = createHttpServer()

    pool.query(`SELECT * FROM "user"`, [], (err) => {
        if (err) {
            throw new ClientError(err.message, 500)
        }
        logger.info(`Successful connect to DB.`)
    })

    server.listen(config.server.HTTP.PORT, () => logger.info(`Http server has been started. Port: ${config.server.HTTP.PORT}`))
})()