const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logger = require("morgan");
const routes = require('../api/routes');
const errors = require('../api/middlewares/erros');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use('/api', routes);

app.use(errors.error404);

module.exports = app;

