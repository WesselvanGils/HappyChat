const mySql = require("mysql")
const pool = mySql.createPool(
    {
        connectionLimit: 10,
        multipleStatements: true,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

module.exports =
{
    /* ----- All queries relating to participants ----- */

    getParticipants: (dateID, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`SELECT users.username, users.gender, users.email FROM participants INNER JOIN users ON participants.userID=users.ID WHERE dateID = '${dateID}'`,
                    (error, results, fields) =>
                    {
                        connection.release()

                        if (error) callback(error, undefined)
                        if (results) callback(undefined, results)
                    }
                )
            })
        }
        catch (error)
        {
            callback(error, undefined)
        }
    },

    /* ----- All queries relating to dates ------ */

    getDates: (dateID, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`SELECT dates.DateOfDate, dates.TimeOfDate FROM dates WHERE dateID = "${dateID}"`,
                    (error, results, fields) =>
                    {
                        connection.release()

                        if (error) callback(error, undefined)
                        if (results) callback(undefined, results)
                    }
                )
            })
        }
        catch (error)
        {
            callback(error, undefined)
        }
    },
}