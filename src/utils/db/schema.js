const pool = require("./db");
const user = 'create TABLE "user"( uid uuid, email VARCHAR(100), password VARCHAR(100), nickname VARCHAR(30), PRIMARY KEY (uid), UNIQUE(email), UNIQUE (nickname));'
const tag = 'create TABLE "tag"(id SERIAL, creator uuid, name VARCHAR(40) UNIQUE, sortOrder INT DEFAULT(0),FOREIGN KEY (creator) REFERENCES "user" (uid));'


module.exports = async function initDb() {
        await pool.query(user)
        await pool.query(tag)
    console.log('Database init')
    }
