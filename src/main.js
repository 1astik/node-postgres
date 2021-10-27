require('module-alias/register')
const createHttpServer = require('./servers/http')
const config = require('@config')
const logger = require('@logger')

;(async function main() {
    const server = createHttpServer()

    server.listen(config.server.HTTP.PORT, () => logger.info(`Http server has been started. Port: ${config.server.HTTP.PORT}`))
})()