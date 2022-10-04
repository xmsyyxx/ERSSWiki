require("dotenv").config();
const fs = require("fs");
const path = require("path");
const consola = require("consola");
const { $fetch } = require("ohmyfetch");
const s3sync = require("./libs/s3sync");

const shareToken = process.env.UMAMI_SHARE_TOKEN || "hMOGP5FM";
const endpoint = process.env.UMAMI_ENDPOINT || "https://a.xhemj.work/api";

consola.info("开始获取");

const getToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { token, websiteId } = await $fetch(
        `${endpoint}/share/${shareToken}`
      );
      //   consola.success("获取token成功", token);
      resolve({
        token,
        websiteId,
      });
    } catch (error) {
      consola.error("获取token失败", error);
      reject(error);
    }
  });
};

const getViews = (token, websiteId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await $fetch(
        `${endpoint}/website/${websiteId}/metrics?type=url&start_at=1626883200000&end_at=${new Date().getTime()}`,
        {
          headers: {
            "x-umami-share-token": token,
          },
        }
      );
      //   consola.success("获取访问量成功", data);
      resolve(data);
    } catch (error) {
      consola.error("获取访问量失败", error);
      reject(error);
    }
  });
};

getToken()
  .then(({ token, websiteId }) => {
    return getViews(token, websiteId);
  })
  .then((data) => {
    const viewData = {};
    for (let item of data) {
      let path = new URL(`https://www.erssbk.com${item.x}`).pathname;
      path = path.replace(/\/wiki\//gi, "/item/");
      if (
        path.startsWith("/en/") ||
        path.startsWith("en/") ||
        path.startsWith("/zh/") ||
        path.startsWith("zh/")
      ) {
        path = path.replace(/\/?(en|zh)\//gi, "/");
      }
      if (path.endsWith("/")) {
        path = path.slice(0, -1);
      }
      if (path.endsWith(".html")) {
        path = path.split(".html")[0];
      }
      if (!path.startsWith("/item")) continue;
      path = path.replace(/\/item\//gi, "");
      const view = item.y;
      if (viewData[path]) {
        viewData[path] += view;
      } else {
        viewData[path] = view;
      }
    }
    consola.info("获取成功！");
    console.log(viewData);

    consola.info("开始准备写入");
    fs.mkdirSync(path.resolve(__dirname, "./data"), { recursive: true });
    const now = new Date().getTime();
    for (let key in viewData) {
      try {
        const filePath = path.resolve(
          __dirname,
          `./data/${decodeURI(key)}.json`
        );
        fs.writeFileSync(
          filePath,
          JSON.stringify({
            views: viewData[key],
            update: now,
          }),
          "utf-8"
        );
      } catch {}
    }
    consola.success("写入成功！");
    return s3sync("s-bj-1943-ersswiki-1258813047", "./data", "/wiki-status");
  })
  .then(() => {
    consola.success("同步成功！");
  })
  .catch((error) => {
    consola.error(error);
  });
