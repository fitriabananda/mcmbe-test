const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3000,
        waitForConnections: true,
        connectionLimit: 500,
        connectTimeout: 60000
    },
    listPerPage: 10
};

module.exports = config;