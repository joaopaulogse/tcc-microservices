const express = require('express');
const routes = express.Router();
const jogosControler = require('../controllers/jogos.controller');

routes.get('/jogos', jogosControler.listAll);
routes.get('/jogos/:time', jogosControler.getJogo);
routes.get('/times', jogosControler.times);
routes.get("/stop", jogosControler.stop);
routes.get("/start", jogosControler.start);
routes.get("/status", jogosControler.status);

module.exports = routes;
