module.exports = function (app)
{
    const api = require("../controllers/api.controller.js")

    app.post("/sendmails/:dateID", api.start)
}