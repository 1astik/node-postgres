module.exports = {
    database: {
        credentials: {
            user: 'postgres',
            password: 'root',
            host: 'localhost',
            port: 5432,
            database: 'my_db'
        },
    },
    auth: {
        jwt: {
            secret:  process.env.JWT_SECRET || 'password',
            expires: 1800
        }
    },
    server: {
        HTTP: {
            PORT: process.env.HTTP_PORT || 8090
        },
        CORS: {
            ALLOWED_HEADERS: ['origin', 'authorization', 'content-type'],
            ALLOWED_ORIGINS: ['*']
        }
    }
};