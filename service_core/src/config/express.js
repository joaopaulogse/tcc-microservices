const express = require("express");
const routes = require("../api/routes");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logger = require("morgan");
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(helmet())
app.use(logger('dev'))
app.use(routes)



module.exports = app;