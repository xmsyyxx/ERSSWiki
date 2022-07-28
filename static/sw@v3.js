const log = console.log;

const CACHE_NAME = "sw-cache-v3";

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

async function removeOldCache() {
  log("Removing old cache");
  let keys = await caches.keys();
  return await Promise.all(
    keys.map(function (key) {
      return caches.delete(key);
    })
  );
}

async function preFetch(res) {
  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: res.headers,
  });
}

function createPromiseAny() {
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
    const controller = new AbortController();
    const urls = cdnList.map((cdn) => {
      return new URL(cdn + pathname).href;
    });

    let tasks = urls.map((url) => {
      return new Promise((resolve, reject) => {
        fetch(url, {
          signal: controller.signal,
        })
          .then((res) => {
            log("Hit from: " + url);
            return preFetch(res);
          })
          .then((res) => {
            const r = res.clone();
            if (r.status !== 200 && r.status !== 404) {
              return reject(null);
            }
            controller.abort();

            resolve(r);
          })
          .catch(() => reject(null));
      });
    });

    if (!Promise.any) {
      createPromiseAny();
    }

    return Promise.any(tasks)
      .then((res) => res)
      .catch(() => null);
  }
  return fetch(request);
}

self.skipWaiting();
self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);
self.addEventListener("activate", onActivate);
