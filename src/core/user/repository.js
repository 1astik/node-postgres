const db = require('utils/db')
const User = require('./User')

const saveUser = async ({email, password, nickname}) => {
    const response = await db.query(`INSERT INTO "user" (email, password, nickname)
                                     values ($1, $2, $3) RETURNING *`, [email, password, nickname]).catch(err => err)

    return new User(response).getUser()
}

const getUserByEmailForLogin = async (email) => {
    const response = await db.query(`SELECT *
                                     FROM "user"
                                     WHERE email = $1`, [email]).catch(err => err)

    return new User(response).getUserLogin()
}

const getUserByUid = async (uid) => {
    const response = await db.query(`SELECT *
                                     FROM "user"
                                     WHERE uid = $1`, [uid]).catch(err => err)

    return new User(response).getUser()
}

const updateUser = async ({email, password, nickname, uid}) => {
    const response = await db.query(`UPDATE "user"
                                     SET email = COALESCE($1, email),
                                         password = COALESCE($2, password),
                                         nickname = COALESCE($3, nickname)
                                     WHERE uid = $4 RETURNING *`, [email, password, nickname, uid]).catch(err => err)

    return new User(response).getUser()
}

const deleteUserByUid = async (uid) => {
    const response = await db.query(`DELETE FROM "user"
                                     WHERE uid = $1`, [uid]).catch(err => err)

    return new User(response).getUser()
}

const addMyTags = async (tags, creatorId) => {
    const tagsId = []
    tags.forEach(tag => {
        tagsId.push(tag.id)
    })

    const response = await db.query(`UPDATE "user"
                                     SET usertag = array_cat(usertag, $1)
                                     WHERE uid = $2 RETURNING *`, [tagsId, creatorId]).catch(err => err)

    return new User(response).getUser()
}

const deleteUserTagById = async (userId, tagId) => {
    const response = await db.query(`UPDATE "user"
                                     SET usertag = array_remove(usertag, $1)
                                     WHERE uid = $2 RETURNING *`, [tagId, userId]).catch(err => err)

    return new User(response).getUser()
}

module.exports = {
    saveUser,
    getUserByEmailForLogin,
    getUserByUid,
    updateUser,
    deleteUserByUid,
    addMyTags,
    deleteUserTagById
}
