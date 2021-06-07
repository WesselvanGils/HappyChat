const mySql = require("mysql")
const pool = mySql.createPool(
    {
        connectionLimit: 10,
        multipleStatements: true,
        host: "localhost",
        user: "root",
        database: "matches"
    }
)

module.exports =
{
    addMatch: (match) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`INSERT INTO matches VALUES ${match} `,
                (error, results, fields) =>
                {
                    connection.release()

                    callback(undefined, results)
                })
            })
        }
        catch (error)
        {
            callback(error, undefined)
        }
    }
}