module.exports = function (app)
{
    const api = require("../controllers/api.controller.js")

    app.get("/sendmails/:dateID", api.start)
}