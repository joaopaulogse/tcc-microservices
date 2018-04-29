const express = require('express');
const routes = express.Router();
const jogosControler = require('../controllers/jogos.controller');

routes.get('/jogos', jogosControler.listAll);
routes.get('/jogos/:time', jogosControler.getJogo);

module.exports = routes;
