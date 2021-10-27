const service = require('./service')
const validation = require('./validation')
const {validationId} = require('utils/validation')
const {asyncHttpWrapper} = require('utils/error-wrappers')


module.exports.login = asyncHttpWrapper(
    /**
     * @param {import('express').Request & {body: import('./validation/login.body').Credentials}} req
     * @param {import('express').Response} res
     */
    async (req, res) => {

        validation.login(req.body)

        const response = await service.login(req.body)

        res.status(200).json(response)
    }
)

module.exports.signin = asyncHttpWrapper(
    /**
     * @param {import('express').Request & {body: import('./validation/signin.body').Credentials}} req
     * @param {import('express').Response} res
     */
    async (req, res) => {

        validation.signin(req.body)

        const response = await service.signin(req.body)

        res.status(200).json(response)
    }
)

module.exports.refreshToken = asyncHttpWrapper(
    async (req, res) => {

        validationId(req.user.uid)

        const response = await service.refreshToken(req.user.uid)

        res.status(200).json(response)
    }
)

