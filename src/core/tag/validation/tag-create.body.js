

/**
 * @typedef CreateUserBody
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
                maxLength: 'The email address cannot be longer than 50 characters',
            }
        },
        sortOrder: {
            type: 'integer',
        }
    },
    additionalProperties: false,
    required: ['name'],
    errorMessage: {
        required: {
            name: 'Name is required',
        }
    }
}
