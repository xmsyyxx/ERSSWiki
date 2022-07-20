let log = console.log;

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

async function handleFetch(req) {
  let request = req.clone();
  let siteHostname = new URL(new Request("").url).hostname;
  let url = new URL(request.url);
  let cdnUrl = "https://wikioss.xhemj.work/public";
  log("Fetch: " + url.href);
  if (siteHostname === "baike.xmsyyxx.com" && url.hostname === siteHostname) {
    let requestPathname = url.pathname;
    return fetch(new Request(cdnUrl + requestPathname));
  }
  return fetch(request);
}

self.skipWaiting();
self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);
self.addEventListener("activate", onActivate);
