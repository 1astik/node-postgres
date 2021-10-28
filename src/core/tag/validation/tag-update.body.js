/**
 * @typedef UpdateTagBody
 * @type {Object}
 * @property {String} name
 * @property {Number} sortOrder
 */


module.exports = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 40,
            transform: ['trim'],
            errorMessage: {
                maxLength: 'The name cannot be longer than 40 characters',
            }
        },
        sortOrder: {
            type: 'integer',
        }
    },
    additionalProperties: false,
}
