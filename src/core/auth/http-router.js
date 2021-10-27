const {login, signin, refreshToken} = require('./http-controller')
const parse = require('helpers/parse')
const security = require('helpers/security')


/** @param {import('express')} express */
module.exports = function(express) {
    const router = express.Router()

    router.post('/login', parse.json, login)

    router.post('/signin', parse.json, signin)

    router.get('/refresh_token', security.authorization, refreshToken)

    return router
}
