

/**
 * @typedef CreateUserBody
 * @type {Object}
 * @property {String} email
 * @property {String} password
 */


module.exports = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            maxLength: 100,
            emailValidator: true,
            transform: ['trim', 'toLowerCase'],
            errorMessage: {
                maxLength: 'The email address cannot be longer than 50 characters',
                emailValidator: 'Invalid email address'
            }
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 100,
            errorMessage: {
                minLength: 'The password cannot be shorter than 8 characters',
                maxLength: 'The password cannot be longer than 100 characters'
            }
        },
        nickname: {
            type: 'string',
            minLength: 3,
            maxLength: 30,
            errorMessage: {
                minLength: 'The password cannot be shorter than 3 characters',
                maxLength: 'The password cannot be longer than 30 characters'
            }
        }
    },
    additionalProperties: false,
}
