const {migrate} = require('postgres-migrations')
const pg = require('pg')
const path = require('path')
const config = require('../src/config/index')

async function init() {
    const client = new pg.Client({...config.database.credentials})
    await client.connect()
    try {
        await migrate({client}, path.resolve(__dirname, 'patch'))
    } finally {
        await client.end()
    }
}

init()