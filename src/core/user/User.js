const {IncorrectData} = require("utils/error");

/**
 * @typedef UserModel
 * @type {Object}
 * @property {String} uid
 * @property {String} email
 * @property {String} password
 * @property {String} nickname
 *
 * @typedef {UserModel} UserModel
 */
class User {
    constructor(postgresResponse = {}) {
        this.users = postgresResponse.rows || null
        if (postgresResponse.code){
            console.log(postgresResponse)
            throw new IncorrectData(postgresResponse.detail, postgresResponse.code)
        }
    }

    getUserLogin(){
        return this.users[0] || null
    }

    getUser(){
        let user = this.users[0] || null

        if (user){
            delete user.password
        }

        return user
    }
}

module.exports = User

