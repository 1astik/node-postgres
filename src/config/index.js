module.exports = {
    database: {
        credentials: {
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || 'root',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'my_db'
        },
    },
    auth: {
        jwt: {
            secret:  process.env.JWT_SECRET || 'password',
            expires: process.env.JWT_EXPIRE || 1800
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