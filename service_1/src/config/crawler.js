const puppeteer = require("puppeteer");
// const request = require("request-promise");
/**
 *
 * @param {String} url
 * @param {Number} count para repetir o numero de click na tabela de resultados
 */
module.exports = async (url, count, rodada = 0) => {

  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--disable-setuid-sandbox', '--no-sandbox']
  });
  try{
    const page = await browser.newPage();
    await page.goto(url, { timeout : 60000 });
    if(count){
      for(let i=0; i < count;i++){
        console.log('Dados da rodada: '+ (rodada - (i+1)) )
        await page.click('.tabela-navegacao-setas.tabela-navegacao-anterior.tabela-navegacao-setas-ativa');
        await page.waitFor(1000);
      }
    }
    const result = await page.content();
    await browser.close();
    return result;
  } catch(err){
    await browser.close();
    throw new Error(err);
  }
}
