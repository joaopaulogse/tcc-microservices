const HTTPStatus = require('http-status');
const Jogo = require("../models/jogos");
const _ = require("lodash");

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
