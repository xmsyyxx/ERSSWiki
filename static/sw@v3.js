const VERSION = "0.1.2-dev.1";
const log = console.log;

function onInstall() {
  self.skipWaiting();
}

function onFetch(event) {
  try {
    event.respondWith(handleFetch(event.request));
  } catch (e) {}
}

async function onActivate() {
  await self.clients.claim();
}

async function trackEvent(type, value) {
  return fetch("https://a.xhemj.work/api", {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      type: "event",
      payload: {
        website: "e95e96cf-e2c8-470d-90f2-3e62be3963f0",
        hostname: "baike.xmsyyxx.com",
        language: "zh-CN",
        url: "/",
        event_type: type,
        event_value: value,
      },
    }),
    method: "POST",
  });
}

async function removeOldCache() {
  log("Removing old cache");
  let keys = await caches.keys();
  return await Promise.all(
    keys.map(function (key) {
      return caches.delete(key);
    })
  );
}

async function returnResponse(res) {
  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: res.headers,
  });
}

async function handleFetch(req) {
  const request = req.clone();
  const siteHostname = new URL(new Request("").url).hostname;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const cdnList = [
    "https://baike.xmsyyxx.com",
    "https://wikioss.xhemj.work/public",
    "https://ersswiki.xmsyyxx.com",
    "https://baike.edgecdn.dnsnet.work",
  ];
  if (siteHostname !== "127.0.0.1") cdnList.push(url.origin);
  // "https://wikioss.xhemj.work/public"
  // "http://127.0.0.1:3000"

  // 如果是当前域下请求
  if (
    ["127.0.0.1", "baike.xmsyyxx.com"].includes(siteHostname) &&
    url.hostname === siteHostname
  ) {
    log("Fetching: " + request.url);
    const urls = cdnList.map((cdn) => {
      return new URL(cdn + pathname).href;
    });

    const AbortEvent = new Event("AbortEvent");
    const Target = new EventTarget();
    const tasks = urls.map((url) => {
      return new Promise((resolve, reject) => {
        const controller = new AbortController();
        let isStop = false;
        Target.addEventListener(AbortEvent.type, () => {
          if (!isStop) controller.abort();
        });

        url += "?v=" + VERSION;

        fetch(url, {
          signal: controller.signal,
        })
          .then((res) => {
            log("Hit from: " + url);
            setTimeout(async () => {
              await trackEvent("cdn", new URL(url).hostname);
            }, 10);
            if (res.status == 200 || res.status == 404) {
              isStop = true;
              Target.dispatchEvent(AbortEvent);
              return resolve(returnResponse(res));
            }
          })
          .catch((error) => {
            if (/aborted/.test(error)) {
              console.log();
            }
            reject(error);
          });
      });
    });

    if (!Promise.any) {
      Promise.any = function (promises) {
        return new Promise((resolve, reject) => {
          promises = Array.isArray(promises) ? promises : [];
          let len = promises.length;
          let errs = [];
          if (len === 0)
            return reject(new AggregateError("All promises were rejected"));
          promises.forEach((p) => {
            if (!p instanceof Promise) return reject(p);
            p.then(
              (res) => resolve(res),
              (err) => {
                len--;
                errs.push(err);
                if (len === 0) reject(new AggregateError(errs));
              }
            );
          });
        });
      };
    }

    return Promise.any(tasks)
      .then((res) => res)
      .catch(() => null);
  }
  return fetch(request).catch(() => null);
}

self.skipWaiting();
self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);
self.addEventListener("activate", onActivate);
