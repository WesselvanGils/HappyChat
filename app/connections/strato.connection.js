const mysqlssh = require("mysql-ssh")
const fs = require("fs")

const sshConfig = {
    host: "ssh.strato.de",
    user: "happy-singles.nl",
    port: 22,
    password: "KUqL!B>>YMK8xAfS"
}

const dbConfig = {
    host: "rdbms",
    user: "dbu2088470",
    password: "&yC2;8nH>rUvkr9:",
    database: "dbs2405669"
}

module.exports = 
{
    getParticipants: mysqlssh
        .connect(sshConfig, dbConfig)
        .then(client =>
        {
            client.query("SELECT * FROM `users`", 
            (err, results, fields) =>
            {
                if (err) throw err
                console.log(results)
                mysqlssh.close()
            })
        })
        .catch(err =>
        {
            console.log(err)
        })
}
// module.exports =
// {
//     /* ----- All queries relating to participants ----- */

//     getParticipants: (dateID, callback) =>
//     {
//         try
//         {
//             pool.getConnection((err, connection) =>
//             {
//                 connection.query(`SELECT users.username, users.gender, users.email FROM participants INNER JOIN users ON participants.userID=users.ID WHERE dateID = '${dateID}'`,
//                     (error, results, fields) =>
//                     {
//                         connection.release()

//                         if (error) callback(error, undefined)
//                         if (results) callback(undefined, results)
//                     }
//                 )
//             })
//         }
//         catch (error)
//         {
//             callback(error, undefined)
//         }
//     },

//     /* ----- All queries relating to dates ------ */

//     getDates: (dateID, callback) =>
//     {
//         try
//         {
//             pool.getConnection((err, connection) =>
//             {
//                 connection.query(`SELECT dates.DateOfDate, dates.TimeOfDate FROM dates WHERE dateID = "${dateID}"`,
//                     (error, results, fields) =>
//                     {
//                         connection.release()

//                         if (error) callback(error, undefined)
//                         if (results) callback(undefined, results)
//                     }
//                 )
//             })
//         }
//         catch (error)
//         {
//             callback(error, undefined)
//         }
//     },
// }