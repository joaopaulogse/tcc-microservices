const { CronJob } = require('cron');
const crawler = require("./crawler");

const consumerGamersTables = new CronJob('10 * * * * *', async () => { // a cada 10 segundos executa o job
    const resultado = await crawler('https://globoesporte.globo.com/futebol/brasileirao-serie-a/');
    console.log(resultado);
});
consumerGamersTables.start()

exports.consumerGamersTables = consumerGamersTables;