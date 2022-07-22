const log = console.log;

function onInstall() {
  self.skipWaiting();
}

function onFetch(event) {
  event.respondWith(handleFetch(event.request));
}

function onActivate(event) {
  event.waitUntil(removeOldCache());
}

async function removeOldCache() {
  let keys = await caches.keys();
  return await Promise.all(
    keys.map(function (key) {
      return caches.delete(key);
    })
  );
}

function listHeader(headers) {
  let o = {};
  for (let item of headers.entries()) {
    o[item[0]] = item[1];
  }
  return o;
}

async function handleFetch(req) {
  let request = req.clone();
  let siteHostname = new URL(new Request("").url).hostname;
  let url = new URL(request.url);
  let cdnUrl = "https://wikioss.xhemj.work/public";
  // "https://wikioss.xhemj.work/public"
  // "http://127.0.0.1:3000"
  if (siteHostname === "baike.xmsyyxx.com" && url.hostname === siteHostname) {
    // baike.xmsyyxx.com
    // 127.0.0.1
    let requestPathname = url.pathname;
    let res = await fetch(cdnUrl + requestPathname);
    let status = res.status;
    log("Fetch: " + url.href);
    if (status > 300) {
      return fetch(req);
    } else {
      return new Response(await res.arrayBuffer(), {
        status: res.status,
        headers: {
          ...listHeader(res.headers),
          "x-by": "ServiceWorker",
        },
        statusText: res.statusText,
      });
    }
  }
  return fetch(request);
}

self.skipWaiting();
self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);
self.addEventListener("activate", onActivate);
