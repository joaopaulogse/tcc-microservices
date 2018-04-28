const puppeteer = require("puppeteer");
// const request = require("request-promise");

module.exports = async (url) => {

    // return await request(url);
    const browser = await puppeteer.launch({
        headless: false
    });
    try{
        const page = await browser.newPage();
        await page.goto(url);
        const result = await page.content();
        await browser.close();
        return result;
    } catch(err){
        throw new Error(err);
    }
}
