const validationCompile = require('utils/validation')


module.exports = {
    signin: validationCompile(require('./signin.body')),
    login: validationCompile(require('./login.body')),
}