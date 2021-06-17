const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("./app/routes/mail.route")(app);

app.listen(port);