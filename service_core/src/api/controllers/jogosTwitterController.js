const HTTPStatus = require("http-status");
const axios = require("axios");
const { consumindoJogos } = require("../../config/jobs");
const JogosComentados = require("../models/jogos-comentados");
const _ = require("lodash");

exports.tweetsJogos = async (req, res) =>{

    try {
        const { jogo } = req.params;
        const jogos = await JogosComentados.find({
            time:{
                $regex: _.deburr(jogo).toLowerCase(),
                $options: 'i'
            }
        });
        return res.json(jogos);
    } catch (error) {
        console.error(error);
        return res.status(HTTPStatus.BAD_REQUEST).send({
            error:error.message
        })
    }

};

exports.stop = (req, res) => {
    try {
      console.log("Encerrando todos os Jobs");
      consumindoJogos.stop();
      console.log("Jobs Encerrados");
      return res.send('SERVIÇOS PARADOS');
    } catch (error) {
      console.log(error);
      return res.send('ERRO AO PARAR SERVIÇOS');
    }
}
  
exports.start = (req, res) => {
    try {
      consumindoJogos.start();
      return res.send('SERVIÇOS INICIADOS');
    } catch (error) {
      console.log(error);
      return res.send('ERRO AO INICIAR SERVIÇOS');
    }
}