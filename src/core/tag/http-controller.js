const service = require('./service')
const validation = require('./validation')
const {validationMyNumber, validationId} = require('utils/validation')
const {asyncHttpWrapper} = require('utils/error-wrappers')


module.exports.createTag = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validation.createTag(req.body)

        const response = await service.createTag(req.body, req.user.uid)

        res.status(201).json(response)
    }
)

module.exports.getTag = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationMyNumber(req.params.id)

        const response = await service.getTagById(req.params.id)

        res.status(200).json(response)
    }
)

module.exports.putTag = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationId(req.user.uid)
        validationMyNumber(req.params.id)
        validation.updateTag(req.body)

        const response = await service.putTag(req.params.id, req.user.uid, req.body)

        res.status(200).json({
            ...response, "creator": {
                "nickname": req.user.nickname,
                "uid": req.user.uid
            }
        })
    }
)

module.exports.deleteTag = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {
        validationId(req.user.uid)
        validationMyNumber(req.params.id)

        await service.deleteTag(req.params.id, req.user.uid)

        res.status(200).json('Tag is delete!')
    }
)

module.exports.getTags = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validation.getTags(req.query)

        const response = await service.getTags(req.query)

        res.status(200).json(response)
    }
)