/**
 * @typedef AddMyTags
 * @type {Object}
 * @property {String[]} tags
 */


module.exports = {
    type: 'object',
    properties: {
        tags: {
            type: 'array',
        }
    },
    additionalProperties: false,
    required: ['tags'],
    errorMessage: {
        required: {
            tags: 'Tags is required',
        }
    }
}
