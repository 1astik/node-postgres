// Result {
//     command: 'INSERT',
//         rowCount: 1,
//         oid: 0,
//         rows: [
//         {
//             uid: '291004ed-27f9-457f-8ec8-8490cffe002c',
//             email: 'teer@mail.ru',
//             password: '$2b$10$DJ9oG6x8Af6msrxAT5Imj.o9sD1qFpLJd/2coPnZYRZZ20uEtD3Kq',
//             nickname: 'Pushka'
//         }
//     ],
//         fields: [
//         Field {
//             name: 'uid',
//             tableID: 16448,
//             columnID: 1,
//             dataTypeID: 2950,
//             dataTypeSize: 16,
//             dataTypeModifier: -1,
//             format: 'text'
//         },
//         Field {
//             name: 'email',
//             tableID: 16448,
//             columnID: 2,
//             dataTypeID: 1043,
//             dataTypeSize: -1,
//             dataTypeModifier: 104,
//             format: 'text'
//         },
//         Field {
//             name: 'password',
//             tableID: 16448,
//             columnID: 3,
//             dataTypeID: 1043,
//             dataTypeSize: -1,
//             dataTypeModifier: 104,
//             format: 'text'
//         },
//         Field {
//             name: 'nickname',
//             tableID: 16448,
//             columnID: 4,
//             dataTypeID: 1043,
//             dataTypeSize: -1,
//             dataTypeModifier: 34,
//             format: 'text'
//         }
//     ],
//         _parsers: [
//         [Function: noParse],
//     [Function: noParse],
//     [Function: noParse],
//     [Function: noParse]
// ],
//     _types: TypeOverrides {
//         _types: {
//             getTypeParser: [Function: getTypeParser],
//             setTypeParser: [Function: setTypeParser],
//             arrayParser: [Object],
//                 builtins: [Object]
//         },
//         text: {},
//         binary: {}
//     },
//     RowCtor: null,
//         rowAsArray: false
// }

// error: повторяющееся значение ключа нарушает ограничение уникальности "user_email_key"
// at Parser.parseErrorMessage (/home/mark/projects/node-postgres/node_modules/pg-protocol/dist/parser.js:287:98)
// at Parser.handlePacket (/home/mark/projects/node-postgres/node_modules/pg-protocol/dist/parser.js:126:29)
// at Parser.parse (/home/mark/projects/node-postgres/node_modules/pg-protocol/dist/parser.js:39:38)
// at Socket.<anonymous> (/home/mark/projects/node-postgres/node_modules/pg-protocol/dist/index.js:11:42)
//     at Socket.emit (node:events:394:28)
//     at addChunk (node:internal/streams/readable:312:12)
//     at readableAddChunk (node:internal/streams/readable:287:9)
//     at Socket.Readable.push (node:internal/streams/readable:226:10)
//     at TCP.onStreamRead (node:internal/stream_base_commons:190:23) {
//         length: 301,
//         severity: 'ОШИБКА',
//         code: '23505',
//         detail: 'Ключ "(email)=(teer@mail.ru)" уже существует.',
//         hint: undefined,
//         position: undefined,
//         internalPosition: undefined,
//         internalQuery: undefined,
//         where: undefined,
//         schema: 'public',
//         table: 'user',
//         column: undefined,
//         dataType: undefined,
//         constraint: 'user_email_key',
//         file: 'nbtinsert.c',
//         line: '663',
//         routine: '_bt_check_unique'
//     }

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

