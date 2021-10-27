const ApplicationError = require('utils/error')
const logger = require('@logger')


module.exports.error404 = function(req, res) {
    res.status(404).json({message: 'Not found'})
}

module.exports.errorHandler = function(error, req, res, next) {
    let status = 0, body = {}
     if (error instanceof ApplicationError) {

        status = ApplicationError.complianceHttpCode(error)
        body = error
    } else if (error instanceof SyntaxError && error.type === 'entity.parse.failed') {
        status = 400
        body.message = 'Invalid data'
    } else {
        status = 500
        body.message = 'Internal server error'
    }

    if (!res.headersSent) {
        res.status(status).json(body)
    }

    if (status >= 500) {
        logger.error(error.message)
    }
}
