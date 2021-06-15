const mySql = require("mysql")
const pool = mySql.createPool(
    {
        connectionLimit: 10,
        multipleStatements: true,
        host: "localhost",
        user: "root",
        database: "strato"
    }
)

module.exports =
{
    /* ----- All queries relating to participants ----- */

    addParticipant: (userID, dateID, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`INSERT INTO participants VALUES ("${userID}", "${dateID}")`,
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

    addDates: (TimeOfDate, TimeOfClosure, Link, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`INSERT INTO dates VALUES ("${TimeOfDate}", "${Link}", "${TimeOfClosure}")`,
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