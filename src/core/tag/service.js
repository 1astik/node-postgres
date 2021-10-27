const repository = require('./repository')
const {EntityNotExists} = require('utils/error')

/**
 * @param {{name: String, sortOrder: Number}} tag
 * @param {String} uid
 * @return {import('./Tag').TagModel}
 */
async function createTag(tag, uid) {
    const findTag = await repository.saveTag({name: tag.name, sortOrder: tag.sortOrder || 0}, uid)

    delete findTag.creator

    return findTag
}

/**
 * @param {Number} tagId
 * @return {import('./Tag').UserModel}
 */
async function getTagById(tagId) {
    const findTag =  await repository.getTagById(tagId)

    if (findTag === 'Undefined'){
        throw new EntityNotExists("Tag with this id is undefined")
    }

    return findTag
}

/**
 * @param {Number} tagId
 * @param {String} creatorId
 * @param {{name: String, sortOrder: Number}} tag
 * @return {import('./Tag').UserModel}
 */
async function putTag(tagId, creatorId, tag) {
    const updateTag =  await repository.updateTag(tagId, creatorId, tag)

    if (updateTag === 'Undefined'){
        throw new EntityNotExists("Tag with this id is undefined")
    }

    delete updateTag.creator

    return updateTag
}


/**
 * @param {String} id
 * @param {String} creatorId
 * @return {void}
 */
async function deleteTag(id, creatorId) {
    const deleteTag = await repository.deleteTag(id, creatorId)

    if (deleteTag === 'Undefined'){
        throw new EntityNotExists("Tag with this id is undefined")
    }

    return void 0
}

async function deleteTagByCreator(creatorId) {
    return await repository.deleteTagByCreator(creatorId)
}

async function getTags({page = 1, limit = 1, sortByName, sortByOrder}) {
    const options = {
        offset: (page - 1) * limit,
        limit,
        sortByOrder,
        sortByName
    }

    const data = await repository.findTags(options)
    const countData = await repository.countTags(options)

    return { data, meta: {offset: options.offset, length: limit, quality: Number(countData)}}
}

async function getMyTags(tags, creatorId) {
    return  await repository.findMyTags(tags, creatorId)
}


module.exports = {
    createTag,
    getTagById,
    deleteTag,
    putTag,
    getTags,
    deleteTagByCreator,
    getMyTags
}
