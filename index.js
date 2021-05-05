const puppeteer = require('puppeteer');
const data = require("./config.json");

let numberofposts = process.argv[2];

(async function () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2' });
    //to get the ss
    //await page.screenshot({ path: 'example.png' });
    //doc
    await page.type("input[name='username']", data.user, { delay: 100 });
    await page.type("input[name='password']", data.pwd, { delay: 100 });

    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("button[type='submit']"),
    ]);

    await page.type("input[placeholder='Search']", 'pepper_pepcoding', { delay: 100 });
    await page.waitForSelector(".-qQT3", { visible: true });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click(".-qQT3"),
    ]);
    await page.waitForSelector("._9AhH0", { visible: true });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("._9AhH0"),
    ]);


    let i = 0;
    do {
        await page.waitForSelector(".fr66n .wpO6b", { visible: true });
        await page.click(".fr66n .wpO6b");


        await Promise.all([
            page.waitForNavigation({ waitUntil: "networkidle2" }),
            page.click("  ._65Bje.coreSpriteRightPaginationArrow"),
        ]);
        ++i;
    } while (i < numberofposts) { }



    await browser.close();
})();