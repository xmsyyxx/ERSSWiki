const fs = require("fs");
const path = require("path");

const targetPath = path.resolve(__dirname, "../dist");
const targetFolder = ["item", "wiki"];

/**
 * 将目录下的 /[item]/index.html 重命名成 /[item].html
 * 例如：
 *     /item/xxxx/index.html -> /item/xxxx.html
 */
for (let name of targetFolder) {
  const files = fs.readdirSync(path.resolve(targetPath, name));
  for (let item of files) {
    const targetIndexFile = path.resolve(targetPath, name, item, "index.html");
    const targetFile = path.resolve(targetPath, name, item + ".html");
    if (fs.existsSync(targetIndexFile)) {
      fs.renameSync(targetIndexFile, targetFile);
      fs.rmdirSync(path.resolve(targetPath, name, item));
    }
  }
}
