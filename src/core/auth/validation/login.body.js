/**
 * @typedef Credentials
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
        }
    },
    additionalProperties: false,
    required: ['email', 'password'],
    errorMessage: {
        required: {
            email: 'Email is required',
            password: 'A password is required',
        }
    }
}