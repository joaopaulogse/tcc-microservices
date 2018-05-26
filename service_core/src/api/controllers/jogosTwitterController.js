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
        }).sort("-createdAt");
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
      return res.json({
          status: 'stop'
      });
    } catch (error) {
      console.log(error);
      return res.send('ERRO AO PARAR SERVIÇOS');
    }
}
  
exports.start = (req, res) => {
    try {
      consumindoJogos.start();
      return res.json({
          status: 'start'
      });
    } catch (error) {
      console.log(error);
      return res.send('ERRO AO INICIAR SERVIÇOS');
    }
}

exports.status = (req, res) => {
    try {
      return res.json({
          status: consumindoJogos.running ? 'running': 'stoped'
      });
    } catch (error) {
      console.log(error);
      return res.send('ERRO AO INICIAR SERVIÇOS');
    }
}