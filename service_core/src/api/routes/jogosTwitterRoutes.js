const express = require("express")
const routes = express.Router()
const jogosTwitterController = require("../controllers/jogosTwitterController")

 routes.get("/:jogo", jogosTwitterController.tweetsJogos)


module.exports = routes;