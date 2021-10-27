const validationCompile = require('utils/validation')


module.exports = {
    putUser: validationCompile(require('./user-put.body')),
    addMyTags: validationCompile(require('./add-myTags.body'))
}
