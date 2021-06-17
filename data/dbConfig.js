module.exports = 
{
    dbServer = {
        "host": process.env.DB_HOST,
        "user": process.env.DB_USERNAME,
        "port": process.env.DB_PORT,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE
    },

    tunnelConfig = {
        "host": process.env.DB_SSH_HOST,
        "port": 22,
        "username": process.env.DB_SSH_USER,
        "password": process.env.DB_SSH_PASSWORD
    },

    forwardConfig = {
        "srcHost": "127.0.0.1",
        "srcPort": 3306,
        "dstHost": dbServer.host,
        "dstPort": dbServer.port
    }
}