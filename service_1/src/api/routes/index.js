const express = require('express');
const routes = express.Router();
const jogosControler = require('../controllers/jogos.controller');

routes.get('/jogos', jogosControler.listAll);
routes.get('/jogos/:time', jogosControler.getJogo);
routes.get('/times', jogosControler.times);
routes.get("/stop1", jogosControler.stop1);
routes.get("/stop2", jogosControler.stop2);
routes.get("/start1", jogosControler.start1);
routes.get("/start2", jogosControler.start2);
routes.get("/status/:service", jogosControler.status);

module.exports = routes;
