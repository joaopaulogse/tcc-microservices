const puppeteer = require("puppeteer");
const request = require("request-promise");

module.exports = async (url) => {

    // return await request(url);
    const browser = await puppeteer.launch({
        headless: false
    });
    try{
        const page = await browser.newPage();
        await page.goto(url);
        return await page.content();
    } catch(err){
        throw new Error(err);
    }finally{
        browser.close();
    }
    // const result = await page.evaluate(body => body.innerHTML, bodyHandle);

    // return result;
}