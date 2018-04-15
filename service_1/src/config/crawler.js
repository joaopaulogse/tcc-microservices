const puppeteer = require("puppeteer");


module.exports = async (url) => {

    const browser = await puppeteer.launch({
        headless: false
      });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(500);
    const result = await page.evaluate(() => {
        let placares = document.querySelector('.placar-jogo').innerHTML;

        return placares;
    });

    browser.close();
    return result;
}