const http = require("http");
const app = require("./config/express");

const { consumindoJogos } = require("./config/jobs");

const server = http.createServer(app);


server.listen(3000, '0.0.0.0', ()=>{
    console.log(`
    Server URL: http://localhost:${server.address().port}

    `);
    consumindoJogos.start();
})

module.exports = server;
