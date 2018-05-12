const express = require("express")
const routes = express.Router()
const jogosTwitterRoutes = require("./jogosTwitterRoutes");
const jogosTwitterController = require("../controllers/jogosTwitterController");

routes.use("/tweets", jogosTwitterRoutes)
routes.get("/stop", jogosTwitterController.stop);
routes.get("/start", jogosTwitterController.start);

module.exports = routes;
