const request = require("supertest");
const server = require("../../src/server");

describe('Teste de Integração dos EndPoints dos jogos', ()=>{

  it('GET todos jogos', (done)=>{
      request(server)
        .get("/api/jogos")
        .end((err, res)=>{

            // console.log(res.body);
            done();
        });
  })

});
