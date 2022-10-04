const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");
const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
const version = require("../../package.json").version;

export default function writeInfo() {
  const targetFilePath = path.resolve(__dirname, "../../assets/build.json");
  if (fs.existsSync(targetFilePath)) {
    const targetFile = fs.readFileSync(targetFilePath, "utf8");
    const targetJson = JSON.parse(targetFile);
    targetJson.version = version;
    targetJson.time = time;
    fs.writeFileSync(targetFilePath, JSON.stringify(targetJson, null, 4));
  }
}
