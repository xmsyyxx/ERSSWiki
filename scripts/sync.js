const consola = require("consola");
const s3sync = require("./libs/s3sync");

s3sync("s-bj-1943-ersswiki-1258813047", "../../dist", "/")
  .then(() => {
    consola.success("同步成功！");
  })
  .catch((err) => {
    consola.error(err);
  });
