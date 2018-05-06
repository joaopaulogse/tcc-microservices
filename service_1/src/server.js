const http = require("http");
const app = require("./config/express");
const puppeteer = require("puppeteer")

const { consumindoJogos, consumindoTodosJogos } = require("./config/jobs");

const server = http.createServer(app);


server.listen(3000, '0.0.0.0', ()=>{
    console.log(`
http://${server.address().address}:${server.address().port} running...

    `);
    consumindoTodosJogos.start();
    consumindoJogos.start();
})

process.on('SIGINT', function () {
  console.log("Encerrando todos os Jobs");
  consumindoJogos.stop();
  consumindoTodosJogos.stop();
  console.log("Jobs Encerrados");
  process.exit(0);
});

module.exports = server;
