const { CronJob } = require('cron');
const crawler = require("./crawler");

const cheerio = require("cheerio");

// const consumerGamersTables = new CronJob('* * * * * *', async () => { // a cada 10 segundos executa o job
//     const resultado = await crawler('https://globoesporte.globo.com/futebol/brasileirao-serie-a/');
//     console.log(resultado)
// });
// consumerGamersTables.start()
(async ()=>{
    let info = []
    try{

        const resultado = await crawler('https://globoesporte.globo.com/futebol/brasileirao-serie-a/');
        const $ = cheerio.load(resultado);
        $('div[class="placar-jogo"]').each((index,element)=>{
            element.children.map(div=>{
                let obj = {};
                if(div.name === 'meta'){
                    if(div.attribs.itemprop == 'name'){
                        obj.confronto = div.attribs.content;
                    }
                    if(div.attribs.itemprop === 'startDate'){
                        obj.diaConfronto = div.attribs.content;
                    }
                }
                if(div.name == 'a'){
                    div.children.map(placar=>{
                        if(placar.attribs.class.includes('informacoes')){
                            console.log('info: ', placar.children)
                            obj.diaConfrontoOficial = placar.children[0].data
                            obj.local = placar.children[1].children[0].data
                            obj.horarioConfronto = placar.children[2].data

                        }
                        if(placar.attribs.class.includes('equipes')){
                            console.log('equipes: ', placar.children)
                        }
                    })
                }
                if(!!obj){
                    info.push(obj);
                }
            })
        })
        console.log(info)
    } catch(err){
        console.log(err)
    }
})();


// exports.consumerGamersTables = consumerGamersTables;