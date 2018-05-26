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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(routes)



module.exports = app;