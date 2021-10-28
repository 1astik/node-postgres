const {IncorrectData} = require("utils/error");

/**
 * @typedef TagModel
 * @type {Object}
 * @property {String} uid
 * @property {String} email
 * @property {String} password
 * @property {String} nickname
 *
 * @typedef {TagModel} TagModel
 */
class Tag {
    constructor(postgresResponse = {}) {
        this.tags = postgresResponse.rows || null
        this.rowCount = postgresResponse.rowCount
        if (postgresResponse.code) {
            throw new IncorrectData(postgresResponse.detail, postgresResponse.code)
        }
    }

    getTag() {
        const tag = this.tags[0]

        return !tag ? 'Undefined' : this.tag(tag)
    }

    deleteTag() {
        return this.rowCount === 0 ? 'Undefined' : 'Done'
    }

    getTags() {
        return this.tags.map(tag =>
            this.tag(tag)
        )
    }

    getMyTags() {
        return this.tags.map(tag => {
            return {
                id: tag.id,
                name: tag.name,
                sortOrder: tag.sortorder
            }
        } )
    }

    getCount() {
        return this.tags[0].count
    }

    tag(tag) {
        return {
            "creator": {
                "nickname": tag.nickname,
                "uid": tag.creator
            },
            "name": tag.name,
            "sortOrder": tag.sortorder
        }
    }

}

module.exports = Tag

