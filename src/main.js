require('module-alias/register')
const createHttpServer = require('./servers/http')
const config = require('@config')
const logger = require('@logger')
const initDb = require('./utils/db/schema')
const pool = require('./utils/db')

;(async function main() {
    const server = createHttpServer()

    pool.query(`SELECT * FROM "user"`, [], (err) => {
        if (err) {
            initDb()
        }
        logger.info(`Successful connect to DB.`)
    })


    server.listen(config.server.HTTP.PORT, () => logger.info(`Http server has been started. Port: ${config.server.HTTP.PORT}`))
})()