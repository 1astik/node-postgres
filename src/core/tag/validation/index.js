const validationCompile = require('utils/validation')


module.exports = {
    createTag: validationCompile(require('./tag-create.body')),
    updateTag: validationCompile(require('./tag-update.body')),
    getTags: validationCompile(require('./get-tags.query'))
}
