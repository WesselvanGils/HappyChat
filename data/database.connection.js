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
                connection.query(`INSERT INTO dates VALUES ("${match.male}", "${match.female}", "${match.time}", "${match.link}")`,
                    (error, results, fields) =>
                    {
                        connection.release()

                        if (error) callback(error, undefined)
                        if (results) callback(undefined, results)
                    })
            })
        }
        catch (error)
        {
            callback(error, undefined)
        }
    },

    getByMaleEmail: (email, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`SELECT * FROM dates WHERE Male = "${email}"`,
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

    getByFemaleEmail: (email, callback) =>
    {
        try
        {
            pool.getConnection((err, connection) =>
            {
                connection.query(`SELECT * FROM dates WHERE Female = "${email}"`,
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
    }
}