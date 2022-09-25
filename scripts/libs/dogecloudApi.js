require("dotenv").config();
const request = require("request");
const crypto = require("crypto");
const querystring = require("querystring");

module.exports = function DogecloudApi(
  apiPath,
  data = {},
  jsonMode = false,
  callback = null
) {
  const accessKey = process.env.DOGE_ACCESS_KEY;
  const secretKey = process.env.DOGE_SECRET_KEY;
  console.log("accessKey: " + accessKey);
  console.log("secretKey: " + secretKey);

  const body = jsonMode ? JSON.stringify(data) : querystring.encode(data);
  const sign = crypto
    .createHmac("sha1", secretKey)
    .update(Buffer.from(apiPath + "\n" + body, "utf8"))
    .digest("hex");
  const authorization = "TOKEN " + accessKey + ":" + sign;

  request(
    {
      url: "https://api.dogecloud.com" + apiPath,
      method: "POST",
      body: body,
      headers: {
        "Content-Type": jsonMode
          ? "application/json"
          : "application/x-www-form-urlencoded",
        Authorization: authorization,
      },
    },
    function (err, response, ret) {
      if (!callback) return;
      if (err) {
        callback(err, null);
        return;
      }
      ret = JSON.parse(ret);
      if (ret.code !== 200) {
        callback({ Error: "API Error: " + ret.msg }, null);
        return;
      }
      callback(null, ret.data);
    }
  );
};
