const http = require("http");
const app = require("./config/express");
const server = http.createServer(app);

const { consumindoJogos } = require("./config/jobs");

server.listen(process.env.PORT || 3001, '0.0.0.0', ()=>{
    console.log(`http://${server.address().address}:${server.address().port} running...`)
    require("./config/jobs"); // carrega dados
    consumindoJogos.start();
})


process.on('SIGINT', function () {
    console.log("Encerrando todos os Jobs");
    consumindoJogos.stop();
    console.log("Jobs Encerrados");
    process.exit(0);
});