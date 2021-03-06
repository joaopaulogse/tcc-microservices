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
    let jogos = await Jogo.find({}).sort('-rodada');
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
    let jogos = await Jogo.find().sort('-rodada');
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

exports.stop1 = (req, res) => {
  try {
    console.log("Encerrando todos os Jobs");
    consumindoJogos.stop();
    console.log("Jobs Encerrados");
    return res.json({
      status : 'stoped'
    });
  } catch (error) {
    console.log(error);
    return res.send('ERRO AO PARAR SERVIÇOS');
  }
}
exports.stop2 = (req, res) => {
  try {
    console.log("Encerrando todos os Jobs");
    consumindoTodosJogos.stop();
    console.log("Jobs Encerrados");
    return res.json({
      status : 'stoped'
    });
  } catch (error) {
    console.log(error);
    return res.send('ERRO AO PARAR SERVIÇOS');
  }
}

exports.start1 = (req, res) => {
  try {
    consumindoJogos.start();
    return res.json({
      status : 'started'
    });
  } catch (error) {
    console.log(error);
    return res.send('ERRO AO INICIAR SERVIÇOS');
  }
}
exports.start2 = (req, res) => {
  try {
    consumindoTodosJogos.start();
    return res.json({
      status : 'started'
    });
  } catch (error) {
    console.log(error);
    return res.send('ERRO AO INICIAR SERVIÇOS');
  }
}

exports.status = (req, res) => {
  try {
    let { service } = req.params;
    if(service == 1){
      return res.json({
        status: consumindoJogos.running ? 'running' : 'stoped'
      });
    }else if(service == 2) {
      return res.json({
        status: consumindoTodosJogos.running ? 'running' : 'stoped'
      });
    }else{
      return res.status(404).json({
        message: 'Service not found'
      });
    }
  } catch (error) {
    console.log(error);
    return res.send('ERRO AO INICIAR SERVIÇOS');
  }
}
