const cheerio = require("cheerio");
const { $fetch } = require("ohmyfetch");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const log = console.log;

const ENDPOINT = "http://127.0.0.1:5500";
const TARGET_PATH = path.resolve(__dirname, "../dist");
const TARGET_FOLDER = ["item", "wiki"];

(async () => {
  /**
   * TODO:
   * 由于 Nuxt 自带的服务端渲染总是报错，
   * 所以自己写服务端渲染进行替换
   */
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  for (let name of TARGET_FOLDER) {
    const files = fs.readdirSync(path.resolve(TARGET_PATH, name));
    for (let item of files) {
      const targetPath = ["/item", "/wiki"];
      for (let pathname of targetPath) {
        const url = `${ENDPOINT}${pathname}/${item}`;

        await page.goto(url);
        await page.waitForSelector(".wiki-item");
        await page.waitForSelector("body > link[rel='stylesheet']");
        // await page.waitForTimeout(100);

        const contentBody = await page.evaluate(() => {
          return document.querySelector("#__nuxt").innerHTML;
        });
        let loadCssUrls = await page.evaluate(() => {
          return Array.from(
            document.querySelectorAll("body > link[rel='stylesheet']")
          ).map((element) => element.href);
        });
        loadCssUrls = loadCssUrls.map((url) => {
          return `<link href="${url}" rel="stylesheet" type="text/css">`;
        });
        // log({ loadCssUrls });

        const originHtmlRaw = fs.readFileSync(
          path.resolve(TARGET_PATH, name, item),
          "utf8"
        );
        const $ = cheerio.load(originHtmlRaw);
        $("#__nuxt").html(contentBody);
        for (let html of loadCssUrls) {
          $(html).appendTo("head");
        }
        fs.writeFileSync(
          path.resolve(TARGET_PATH, name, item),
          $.html(),
          "utf8"
        );
        log(`${item} 替换成功`);
      }
    }
  }
  await browser.close();
})();
