const axios = require("axios");
const { CronJob } = require("cron");
const JogosComentados = require("../api/models/jogos-comentados");
const _ = require("lodash");



/**
 * Cron Job para que faça 1 requisição a cada 10 segundos
 */
let i = 0;
const consumindoJogos = new CronJob('2 * * * * *', async () => { // a cada 2 segundos executa o job
    let { data } = await axios.get(`http://service_1:3000/api/times`);
    try{
        if(data[i] == undefined){
            i = 0;
        }else{
            console.log(`Buscando dados na Service 2 - Time: ${data[i]} - ${new Date().toLocaleString('pt-br')}`)
            const comentariosTime = await axios.get(`http://service_2:5000/search/${data[i]}?count=100`);
            comentariosTime.data.map(async comentario => {
                if(comentario.hasPolarity == true){
                    await JogosComentados({
                        user: comentario.user,
                        polarity: comentario.polarity,
                        subjectivity: comentario.subjectivity,
                        tweet: comentario.tweet,
                        tweetTranslated: comentario.tweetTranslated,
                        lang: comentario.lang,
                        time: _.deburr(data[i]).toLowerCase(),
                        createdAt: new Date()
                    }).save();
                }
            });
            i++;
        }               
    } catch(err){
        console.error('Error na busca dos serviços: ', err.message);
    }
}, null, true);
// console.log(consumindoJogos.running)
// consumindoJogos.start()

exports.consumindoJogos = consumindoJogos;