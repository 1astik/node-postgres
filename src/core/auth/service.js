const userRepository = require('../user/repository')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const config = require('@config')
const {EntityExists, Unauthorized} = require('utils/error')


/**
 * @param {import('./validation/signin.body').Credentials} credentials 
 */
async function login(credentials) {
    const userRecord = await userRepository.getUserByEmailForLogin(credentials.email)

    if (!userRecord)
        throw new EntityExists('User not found or invalid password')

    const correctPassword = await bcrypt.compare(credentials.password, userRecord.password)

    if (!correctPassword)
        throw new EntityExists('User not found or invalid password')

    return getAuthResponse(userRecord.uid)
}

async function signin(user) {
    user.password = await bcrypt.hash(user.password, 10)

    const userRecord = await userRepository.saveUser(user)

    return getAuthResponse(userRecord.uid)
}

async function refreshToken(uid) {
    return getAuthResponse(uid)
}

function getAuthResponse(uid) {
    const jwt = jsonwebtoken.sign(
        {
            uid: uid
        },
        config.auth.jwt.secret,
        {
            algorithm: 'HS256',
            expiresIn: config.auth.jwt.expires
        }
    )

    return {
        "token": jwt,
        "expire": config.auth.jwt.expires
    }
}

/**
 * @param {String} jwt
 */
function verifyJwt(jwt) {
    try {
        return jsonwebtoken.verify(jwt, config.auth.jwt.secret, {algorithms: ['HS256']})
    } catch {
        throw new Unauthorized()
    }
}

/**
 * @param {String} bearerToken
 */
async function authorization(bearerToken) {
    if (!bearerToken)
        throw new Unauthorized()

    const [bearer, jwt] = bearerToken.split(' ')

    if (bearer !== 'Bearer')
        throw new Unauthorized()

    const playload = verifyJwt(jwt)

    const user = await userRepository.getUserByUid(playload.uid)

    if (!user)
        throw new Unauthorized()

    return user
}


module.exports = {
    login,
    signin,
    authorization,
    refreshToken
}
