const {createTag, getTag, deleteTag, putTag, getTags} = require('./http-controller')
const parse = require('helpers/parse')
const security = require('helpers/security')


/**
 * @param {import('express').Router} express
 */
module.exports = function (express) {
    const router = express.Router()

    router.post('/tag', security.authorization, parse.json, createTag)

    router.get('/tag/:id', security.authorization,  getTag)

    router.put('/tag/:id', security.authorization, parse.json,  putTag)

    router.delete('/tag/:id', security.authorization, deleteTag)

    router.get('/tag', security.authorization, getTags)

    return router
}
