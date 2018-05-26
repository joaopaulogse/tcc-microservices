const { CronJob } = require('cron');
const crawler = require("./crawler");
const cheerio = require("cheerio");
const Jogo = require("../api/models/jogos");
const BASE_URL = 'https://globoesporte.globo.com/futebol/brasileirao-serie-a/'

/**
 * verifica a exitencia do jogo se tiver diferente do que no GloboEsporte ele atualiza
 * @param {Promise} confronto
 */
const verificaExistenciaJogo = async (confronto) => {
  const isExisteJogo = await Jogo.findOne({
    confronto: confronto.rodada,
    confronto: confronto.confronto
  });
  if(isExisteJogo){
    return await Jogo.findOneAndUpdate({
      _id:isExisteJogo._id
    },{
      ...confronto,
      updatedAt: new Date()
    }, {
      new: true
    })
  } else {
    return await new Jogo({
      ...confronto,
      createdAt: new Date(),
      updatedAt: new Date()
    }).save()
  }
}

/**
 * buscar os placares
 * @param {Cheerio} $
 * @param {Number} rodada
 */
const buscaDados = ($, rodada) => {
  $('div[class="placar-jogo"]').each( async (index, element)=>{

    let confronto = {};
    confronto.rodada = rodada;
    confronto.confronto = $(element).find('meta[itemprop="name"]').attr('content');
    confronto.dataConfronto = $(element).find('meta[itemprop="startDate"]').attr('content');
    confronto.local = $(element).find('.placar-jogo-informacoes').find('.placar-jogo-informacoes-local').text();
    const dataEHora = $(element).find('.placar-jogo-informacoes').text().split(confronto.local);
    confronto.date = dataEHora[0];
    confronto.hora = dataEHora[1];
    confronto.mandante = $(element).find('.placar-jogo-equipes').find('.placar-jogo-equipes-mandante').find('.placar-jogo-equipes-sigla').attr('title');
    confronto.placarMandante = $(element).find('.placar-jogo-equipes').find('.placar-jogo-equipes-placar').find('.placar-jogo-equipes-placar-mandante').text();
    confronto.visitante = $(element).find('.placar-jogo-equipes').find('.placar-jogo-equipes-visitante').find('.placar-jogo-equipes-sigla').attr('title');
    confronto.placarVisitante = $(element).find('.placar-jogo-equipes').find('.placar-jogo-equipes-placar').find('.placar-jogo-equipes-placar-visitante').text();
    if(!confronto.placarMandante && !confronto.placarVisitante){
      confronto.jogoRealizado = false;
    }else{
      confronto.jogoRealizado = true;
    }
    if(!confronto.placarMandante) confronto.placarMandante = 0;
    if(!confronto.placarVisitante) confronto.placarVisitante = 0;
    return await verificaExistenciaJogo(confronto);
  })
}

/**
 * Cron Job para que faça 1 requisição a cada 10 segundos
 */
const consumindoJogos = new CronJob('10 * * * * *', async () => { // a cada 10 segundos executa o job
  try{
      console.info(`Buscando dados na API às ${new Date().toLocaleString('pt-br')}`);
      const resultado = await crawler(BASE_URL);
      const $ = cheerio.load(resultado);


      let rodada = $('span[class="tabela-navegacao-seletor"]').text().split('');
      rodada = Number(rodada[0]+rodada[1]);
      buscaDados($, rodada);
      console.info("Dados encontrados!");
  } catch(err){
      console.error('Error na busca do dados', err.message);
  }
}, null, true);


/**
 * Cron Job para que faça várias requisições a cada 1 hora
 */
const consumindoTodosJogos = new CronJob('20 * * * * *', async () => { // a cada 1 hora executa o job
  try {
    console.info(`Buscando todas as rodadas na API às ${new Date().toLocaleString('pt-br')}`);
    const resultado = await crawler(BASE_URL);
    const $ = cheerio.load(resultado);


    let rodada = $('span[class="tabela-navegacao-seletor"]').text().split('');
    rodada = Number(rodada[0]+rodada[1]);
    for(let i = 1; i < rodada; i++){
      const result = await crawler(BASE_URL, i, rodada);
      const SEARCH = cheerio.load(result)
      buscaDados(SEARCH, rodada-i);
    }
    console.info("Rodadas cadastradas!")
  } catch (error) {
    console.error("Erro ao atualizar dados das rodadas anteriores", error.message);
  }
}, null, true);


exports.consumindoJogos = consumindoJogos;
exports.consumindoTodosJogos = consumindoTodosJogos;
