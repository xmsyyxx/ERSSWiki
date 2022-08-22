const cheerio = require("cheerio");
const { $fetch } = require("ohmyfetch");
const fs = require("fs");
const path = require("path");
const log = console.log;

const ENDPOINT = "http://127.0.0.1:2333";
const TARGET_PATH = path.resolve(__dirname, "../dist");
const TARGET_FOLDER = ["item", "wiki"];

/**
 * TODO:
 * 由于 Nuxt 自带的服务端渲染总是报错，
 * 所以自己写服务端渲染进行替换
 */
for (let name of TARGET_FOLDER) {
  const files = fs.readdirSync(path.resolve(TARGET_PATH, name));
  for (let item of files) {
    const targetPath = ["/item", "/wiki"];
    for (let pathname of targetPath) {
      const url = `${ENDPOINT}${pathname}/${item}/`;
      $fetch(url).then((res) => {
        const newHtml = cheerio.load(res);
        const contentBody = newHtml("#__nuxt").html();
        const originHtmlRaw = fs.readFileSync(
          path.resolve(TARGET_PATH, name, item, "index.html"),
          "utf8"
        );
        const originHtml = cheerio.load(originHtmlRaw);
        originHtml("#__nuxt").html(contentBody);
        originHtml("#__nuxt").attr("data-server-rendered", "true");
        fs.writeFileSync(
          path.resolve(TARGET_PATH, name, item, "index.html"),
          originHtml.html(),
          "utf8"
        );
        log(`${item} 替换成功`);
      });
    }
  }
}
