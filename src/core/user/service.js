const repository = require("./repository");
const tagService = require('../tag/service')

/**
 * @param {String} userId
 * @return {import('./User').UserModel}
 */
async function getUser(userId) {
    const user = await repository.getUserByUid(userId)

    delete user.uid
    delete user.usertag
    const tags = await getMyTags(userId)

    return {...user, tags}
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
 * @param {String} uid
 * @return {void}
 */
async function deleteUser(uid) {
    await tagService.deleteTagByCreator(uid)
    await repository.deleteUserByUid(uid)

    return void 0
}

async function getMyTags(creatorId) {
    const user = await repository.getUserByUid(creatorId)

    if (!user.usertag)
        return []

    const tags = await tagService.getMyTags(user.usertag, creatorId)

    return tags
}


async function addMyTags(data, creatorId) {
    const tagsFind = await tagService.getMyTags(data.tags, creatorId)

    if (tagsFind.length === data.tags.length){
        await repository.addMyTags(tagsFind, creatorId)
    }

    return await getMyTags(creatorId)
}

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
