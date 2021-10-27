const db = require('utils/db')
const Tag = require('./Tag')

const saveTag = async ({name, sortOrder}, uid) => {
    const response = await db.query(`INSERT INTO "tag" (name, sortOrder, creator)
                                     values ($1, $2, $3) RETURNING *`, [name, sortOrder, uid]).catch(err => err)

    return new Tag(response).getTag()
}

const getTagById = async (tagId) => {
    const response = await db.query(`SELECT 
                                            name,
                                            sortOrder,
                                            nickname,
                                            tag.creator
                                     FROM tag
                                              INNER JOIN "user"
                                                         ON "user".uid = tag.creator
                                     WHERE tag.id = $1`, [tagId]).catch(err => err)

    return new Tag(response).getTag()
}

const updateTag = async (tagId, creatorId, {name, sortOrder}) => {
    const response = await db.query(`UPDATE "tag"
                                     set name = COALESCE($1, name),
                                         sortOrder = COALESCE($2, sortOrder)
                                         WHERE creator = $3 AND id = $4 RETURNING *`, [name, sortOrder, creatorId, tagId]).catch(err => err)

    return new Tag(response).getTag()
}

const deleteTag = async (id, creatorId) => {
    const response = await db.query(`DELETE FROM "tag"
                                     where id = $1 AND creator = $2`, [id, creatorId]).catch(err => err)

    return new Tag(response).deleteTag()
}

const deleteTagByCreator = async (creatorId) => {
    const response = await db.query(`DELETE FROM "tag"
                                     where creator = $1`, [creatorId]).catch(err => err)

    return new Tag(response).deleteTag()
}


const findTags = async ({limit, offset, sortByName, sortByOrder}) => {
    const response = await db.query(`SELECT 
                                            name,
                                            sortOrder,
                                            nickname,
                                            tag.creator
                                     FROM tag
                                              INNER JOIN "user"
                                                         ON "user".uid = tag.creator
                                     WHERE
                                         sortOrder = COALESCE($1, sortOrder)
                                       AND
                                         name ~ COALESCE($2, name)                    
                                     LIMIT $3 OFFSET $4`, [sortByOrder, sortByName, limit, offset,]).catch(err => err)

    return new Tag(response).getTags()
}

const countTags = async ({sortByName, sortByOrder}) => {
    const response = await db.query(`SELECT
                                         COUNT(*)
                                     FROM
                                         tag
                                     WHERE
                                         sortOrder = COALESCE($1, sortOrder)
                                       AND
                                         name ~ COALESCE($2, name)`, [sortByOrder, sortByName]).catch(err => err)

    return new Tag(response).getCount()
}

const findMyTags = async (tags, creatorId) => {
    let findOr = ''

    tags.forEach((tag,i) => {
        if (i === tags.length -1){
            findOr +=  `id = $${i+2}`
        } else {
            findOr +=  `id = $${i+2} OR `
        }

    })

    const response = await db.query(`SELECT
                                         *
                                     FROM
                                         tag
                                     WHERE
                                         creator = $1
                                    AND
                                       ${findOr}`, [creatorId, ...tags]).catch(err => err)

    return new Tag(response).getMyTags()
}


module.exports = {
    saveTag,
    getTagById,
    updateTag,
    deleteTag,
    findTags,
    countTags,
    findMyTags,
    deleteTagByCreator
}
