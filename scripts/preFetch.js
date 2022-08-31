const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const log = console.log;

const ENDPOINT = "http://local.xhemj.work:5500";
// const ENDPOINT = "https://ersswiki.xhemj.work";
const TARGET_PATH = path.resolve(__dirname, "../dist");
const TARGET_FOLDER_INFO = {
  item: {
    width: 1200,
    height: 900,
  },
  wiki: {
    width: 390,
    height: 844,
  },
};

(async () => {
  /**
   * TODO:
   * 由于 Nuxt 自带的服务端渲染总是报错，
   * 所以自己写服务端渲染进行替换
   */
  console.time("preFetch");
  for (let pathname in TARGET_FOLDER_INFO) {
    const browserWidth = TARGET_FOLDER_INFO[pathname].width;
    const browserHeight = TARGET_FOLDER_INFO[pathname].height;
    const files = fs.readdirSync(path.resolve(TARGET_PATH, pathname));
    const browser = await puppeteer.launch({
      headless: false,
      args: [`--window-size=${browserWidth},${browserHeight}`],
    });
    const page = await browser.newPage();
    page.setViewport({ width: browserWidth, height: browserHeight });

    const fileLength = files.length;
    for (let i in files) {
      let item = files[i];
      item = item.split(".")[0];
      const url = `${ENDPOINT}/${pathname}/${item}?bot=1`;

      await page.goto(url);
      // 等待渲染出正文
      await page.waitForSelector(".wiki-item");
      // 等待 Javascript 已经添加 CSS 完毕
      await page.waitForSelector("body > link[rel='stylesheet']");
      // 等待 WikiFooter 渲染完
      await page.waitForSelector(".wiki-footer__mounted");

      const contentBody = await page.evaluate(() => {
        return document.querySelector("#__nuxt").innerHTML;
      });
      // 获取页面额外添加得 CSS 地址
      let loadCssUrls = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll("body > link[rel='stylesheet']")
        ).map((element) => element.href);
      });
      loadCssUrls = loadCssUrls.map((url) => {
        return `<link href="${url}" rel="stylesheet" type="text/css">`;
      });

      // 获取原始渲染的文件准备替换
      const originHtmlRaw = fs.readFileSync(
        path.resolve(TARGET_PATH, pathname, item + ".html"),
        "utf8"
      );
      const $ = cheerio.load(originHtmlRaw);
      $("#__nuxt").html(contentBody);
      // 将异步加载的 CSS 添加到页面中
      for (let html of loadCssUrls) {
        $(html).appendTo("head");
      }
      fs.writeFileSync(
        path.resolve(TARGET_PATH, pathname, item + ".html"),
        $.html(),
        "utf8"
      );
      log(`(${Number(i) + 1}/${fileLength}) ${item} 替换成功`);
    }
    await browser.close();
  }
  console.timeEnd("preFetch");
})();
