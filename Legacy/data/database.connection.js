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
    addMatch: (match, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`INSERT INTO dates VALUES ("${match.person1}", "${match.person2}", "${match.time}", "${match.link}")`,
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

    getUser: (email, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`SELECT * FROM users WHERE Email = "${email}"`,
                    (error, results, fields) =>
                    {
                        connection.release()

                        if (error) callback(error, undefined)
                        if (results) callback(undefined, results)
                    }
                )
            })
        } catch (error)
        {
            callback(error, undefined)
        }
    },

    getDates: (email, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`SELECT * FROM dates WHERE person1 = "${email}" OR person2 = "${email}"`,
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

    clearDates: (callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`DELETE FROM dates`,
                    (error, results, fields) =>
                    {
                        connection.release()

                        if (error) callback(error, undefined, false)
                        if (results) callback(undefined, results, true)
                    }
                )
            })
        }
        catch (error)
        {
            callback(error, undefined, false)
        }
    }
}