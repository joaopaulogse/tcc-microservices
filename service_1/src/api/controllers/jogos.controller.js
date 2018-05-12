const HTTPStatus = require('http-status');
const Jogo = require("../models/jogos");
const _ = require("lodash");
const { consumindoTodosJogos, consumindoJogos }  = require("../../config/jobs")

/**
 * lista todos os jogos
 * @param {*} req
 * @param {*} res
 */
exports.listAll = async (req, res) => {
  try {
    const { rodada, mandante, visitante, local } = req.query;
    let jogos = await Jogo.find();
    if(rodada){
      jogos = jogos.filter(jogo => jogo.rodada.includes(rodada));
    }
    jogos = jogos
      .filter(jogo => !!mandante ? jogo.mandante.toLowerCase().trim().includes(mandante.toLowerCase().trim()): jogo)
      .filter(jogo => !!visitante ? jogo.visitante.toLowerCase().trim().includes(visitante.toLowerCase().trim()): jogo)
      .filter(jogo => !!local ? jogo.local.toLowerCase().includes(local.toLowerCase()): jogo)
    return res.status(HTTPStatus.OK).json(jogos);
  } catch (error) {
    console.error(error);
    return res.status(HTTPStatus.BAD_REQUEST).json({ error: 'Não foi possível encontrar' });
  }
}

exports.getJogo = async (req, res) => {
  try {
    const { time } = req.params;
    let jogos = await Jogo.find();
    jogos = jogos.filter(jogo=>
        _.deburr(jogo.mandante.toLowerCase()).includes(_.deburr(time.toLowerCase()))
        || _.deburr(jogo.visitante.toLowerCase()).includes(_.deburr(time.toLowerCase()))
        || _.deburr(jogo.confronto.toLowerCase()).includes(_.deburr(time.toLowerCase()))
    )
    return res.status(HTTPStatus.OK).json(jogos);
  } catch (error) {
    console.error(error);
    return res.status(HTTPStatus.BAD_REQUEST).json({ error: 'Não foi possível encontrar' });
  }
}

exports.times = async (req, res) => {
  try {
    let jogos = await Jogo.find({ rodada:1 }).select({mandante:1, visitante:1}).exec();
    let alltime = []
    jogos.map(jogo=>{
      alltime.push(jogo.visitante)
      alltime.push(jogo.mandante)
      return jogo;
    })
    return res.json(alltime);
  } catch (error) {
    console.error(error);
    res.json({error})
  }
};

exports.stop = (req, res) => {
  try {
    console.log("Encerrando todos os Jobs");
    consumindoJogos.stop();
    consumindoTodosJogos.stop();
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
    consumindoTodosJogos.start();
    return res.send('SERVIÇOS INICIADOS');
  } catch (error) {
    console.log(error);
    return res.send('ERRO AO INICIAR SERVIÇOS');
  }
}
