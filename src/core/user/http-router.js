const {getUser, putUser, deleteUser, getUserTags, addUserTags, deleteUserTag} = require('./http-controller')
const parse = require('helpers/parse')
const security = require('helpers/security')


/**
 * @param {import('express').Router} express
 */
module.exports = function (express) {
    const router = express.Router()

    router.get('/user', security.authorization,  getUser)

    router.put('/user', security.authorization, parse.json,  putUser)

    router.delete('/user', security.authorization, deleteUser)

    router.get('/user/tag/my', security.authorization, getUserTags)

    router.post('/user/tag', security.authorization, parse.json, addUserTags)

    router.delete('/user/tag/:id', security.authorization, deleteUserTag)

    return router
}
