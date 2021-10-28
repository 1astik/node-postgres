const repository = require("./repository");
const tagService = require('../tag/service')

/**
 * @param {String} userId
 * @return {import('./User').UserModel}
 */
async function getUser(userId) {
    const user = await repository.getUserByUid(userId)

    delete user.uid

    return user
}

/**
 * @param {{email: String, password: String, nickname: String, uid: String}} user
 * @return {import('./User').UserModel}
 */
async function putUser(user) {
    const userRecord = await repository.updateUser(user)

    delete userRecord.uid

    return userRecord
}

/**
 * @param {String} userId
 * @return {void}
 */
async function deleteUser(userId) {
    await repository.deleteUserByUid(userId)

    return void 0
}

/**
 * @param {String} creatorId
 * @return {{id: Number, name: String, sortByOrder: Number}[]}
 */
async function getMyTags(creatorId) {
    const user = await repository.getUserByUid(creatorId)

    if (!user.usertag)
        return []

    const tags = await tagService.getMyTags(user.usertag, creatorId)

    return tags
}

/**
 * @param {{tags: String[]}} data
 * @param {String} creatorId
 * @return {tags: Array}
 */
async function addMyTags(data, creatorId) {
    const tagsFind = await tagService.getMyTags(data.tags, creatorId)

    if (tagsFind.length === data.tags.length){
        await repository.addMyTags(tagsFind, creatorId)
    }

    return await getMyTags(creatorId)
}

/**
 * @param {String} userId
 * @param {Number} tagId
 * @return {tags: Array}
 */
async function deleteUserTagById(userId, tagId) {
    await repository.deleteUserTagById(userId, tagId)

    return await getMyTags(userId)
}


module.exports = {
    getUser,
    putUser,
    deleteUser,
    getMyTags,
    addMyTags,
    deleteUserTagById
}
