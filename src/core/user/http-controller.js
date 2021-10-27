const service = require('./service')
const validation = require('./validation')
const {validationId, validationMyNumber} = require('utils/validation')
const {asyncHttpWrapper} = require('utils/error-wrappers')


module.exports.getUser = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationId(req.user.uid)

        const response = await service.getUser(req.user.uid)

        res.status(201).json(response)
    }
)

module.exports.putUser = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationId(req.user.uid)
        validation.putUser(req.body)

        const response = await service.putUser({...req.body, uid: req.user.uid})

        res.status(200).json(response)
    }
)

module.exports.deleteUser = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationId(req.user.uid)

        await service.deleteUser(req.user.uid)

        res.status(200).json('User is delete!')
    }
)

module.exports.getUserTags = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationId(req.user.uid)

        const response = await service.getMyTags(req.user.uid)

        res.status(200).json({tags: response})
    }
)

module.exports.addUserTags = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationId(req.user.uid)
        validation.addMyTags(req.body)

        const response = await service.addMyTags(req.body, req.user.uid)

        res.status(200).json(response)
    }
)

module.exports.deleteUserTag = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationId(req.user.uid)
        validationMyNumber(req.params.id)

        const response = await service.deleteUserTagById(req.user.uid, req.params.id)

        res.status(200).json({tags: response})
    }
)