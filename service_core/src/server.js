const http = require("http");
const app = require("./config/express");
const server = http.createServer(app);

server.listen(process.env.PORT || 3001, '0.0.0.0', ()=>{
    console.log(`http://${server.address().address}:${server.address().port} running...`)
})