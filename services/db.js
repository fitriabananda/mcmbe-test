const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    console.log("connection in");
    const [results, ] = await connection.execute(sql, params);
    console.log("query executed");
    return results; 
}

module.exports = {
    query
}