require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");
const S3SyncClient = require("s3-sync-client");
const { TransferMonitor } = require("s3-sync-client");
const DogecloudApi = require("./dogecloudApi");
const path = require("path");
const consola = require("consola");
const mime = require("mime-types");

module.exports = function s3sync(s3bucket, localPath, remotePath, config) {
  return new Promise(async (resolve, reject) => {
    DogecloudApi(
      "/auth/tmp_token.json",
      {
        channel: "OSS_FULL",
        scopes: ["*"],
      },
      true,
      async (err, data) => {
        if (err) {
          console.log(err.Error);
          return;
        }
        const credentials = data.Credentials;
        consola.info(credentials);
        const s3Client = new S3Client({
          region: "ap-beijing",
          endpoint: process.env.DOGE_S3_ENDPOINT,
          credentials: {
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
          },
        });

        const { sync } = new S3SyncClient({ client: s3Client });
        const monitor = new TransferMonitor();
        const targetDir = path.resolve(__dirname, localPath);
        monitor.on("progress", (progress) => {
          consola.info(`  ${progress.count.current}/${progress.count.total}`);
        });

        consola.info("开始上传");
        await sync(targetDir, `s3://${s3bucket}${remotePath}`, {
          monitor,
          del: true,
          commandInput: {
            ContentType: (syncCommandInput) =>
              mime.lookup(syncCommandInput.Key) || "text/html; charset=utf-8",
          },
        });
        consola.success("上传完成");
        resolve();
      }
    );
  });
};
