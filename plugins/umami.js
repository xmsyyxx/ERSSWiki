/* eslint-disable */

/**
 * Umami Tracker
 * @url https://github.com/umami-software/umami/blob/24ddf41331bc9138760984c6edd9e8a9adcfe074/tracker/index.js
 * @copyright 2020 Umami Software
 */
export default ({ app }, inject) => {
  function removeTrailingSlash(url) {
    return url && url.length > 1 && url.endsWith("/") ? url.slice(0, -1) : url;
  }

  const hook = (_this, method, callback) => {
    const orig = _this[method];

    return (...args) => {
      callback.apply(null, args);

      return orig.apply(_this, args);
    };
  };

  const {
    screen: { width, height },
    navigator: { language },
    location,
    localStorage,
    document,
    history,
  } = window;
  const { hostname, pathname, search } = location;

  const isPreFetchBot =
    window.URLSearchParams &&
    !!(new window.URLSearchParams(search).get("bot") === "1");

  const website = "8f7c6463-9ca3-48a1-b82b-55bef7bd0cc9";
  const hostUrl = "https://a.xhemj.work";
  const autoTrack = true;
  const dnt = false;
  const cssEvents = true;
  const domain = "";
  const domains = domain.split(",").map((n) => n.trim());

  const eventClass = /^wiki--([a-z]+)--([\w]+[\w-]*)$/;
  const eventSelect = "[class*='wiki--']";

  const trackingDisabled = () =>
    (localStorage && localStorage.getItem("umami.disabled")) ||
    dnt ||
    (domain && !domains.includes(hostname));

  const root = hostUrl
    ? removeTrailingSlash(hostUrl)
    : script.src.split("/").slice(0, -1).join("/");
  const screen = `${width}x${height}`;
  const listeners = {};
  let currentUrl = `${pathname}${search}`;
  let currentRef = window.document.referrer;
  let cache;

  /* Collect metrics */

  const getPayload = () => ({
    website,
    hostname,
    screen,
    language,
    url: currentUrl,
  });

  const assign = (a, b) => {
    Object.keys(b).forEach((key) => {
      a[key] = b[key];
    });
    return a;
  };

  const collect = (type, payload, persist = false) => {
    if (trackingDisabled()) return;
    const endpoint = `${root}/api`;
    let headers = { "Content-Type": "application/json" };
    if (cache) headers["x-umami-cache"] = cache;
    let options = {
      method: "POST",
      body: JSON.stringify({ type, payload }),
      headers,
    };
    if (!persist) {
      fetch(endpoint, options)
        .then((res) => res.text())
        .then((resText) => {
          cache = resText;
        });
    } else {
      options["keepalive"] = true;
      fetch(endpoint, options);
    }
  };

  const trackView = (
    url = currentUrl,
    referrer = currentRef,
    uuid = website
  ) => {
    if (isPreFetchBot) return;
    collect(
      "pageview",
      assign(getPayload(), {
        website: uuid,
        url,
        referrer,
      })
    );
  };

  const trackEvent = (
    event_value,
    event_type = "custom",
    url = currentUrl,
    uuid = website
  ) => {
    if (isPreFetchBot) return;
    collect(
      "event",
      assign(getPayload(), {
        website: uuid,
        url,
        event_type,
        event_value,
      })
    );
  };

  /* Handle events */

  const sendEvent = (event_value, event_type) => {
    collect(
      "event",
      assign(getPayload(), {
        event_type,
        event_value,
      }),
      true
    );
  };

  const addEvents = (node) => {
    const elements = node.querySelectorAll(eventSelect);
    Array.prototype.forEach.call(elements, addEvent);
  };

  const addEvent = (element) => {
    (element.getAttribute("class") || "").split(" ").forEach((className) => {
      if (!eventClass.test(className)) return;

      const [, type, value] = className.split("--");
      const listener = listeners[className]
        ? listeners[className]
        : (listeners[className] = () => {
            if (element.tagName === "A") {
              sendEvent(value, type);
            } else {
              trackEvent(value, type);
            }
          });

      element.addEventListener(type, listener, true);
    });
  };

  /* Handle history changes */

  const handlePush = (state, title, url) => {
    if (!url) return;

    currentRef = currentUrl;
    const newUrl = url.toString();

    if (newUrl.substring(0, 4) === "http") {
      currentUrl = "/" + newUrl.split("/").splice(3).join("/");
    } else {
      currentUrl = newUrl;
    }

    if (currentUrl !== currentRef) {
      trackView();
    }
  };

  const observeDocument = () => {
    const monitorMutate = (mutations) => {
      mutations.forEach((mutation) => {
        const element = mutation.target;
        addEvent(element);
        addEvents(element);
      });
    };

    const observer = new MutationObserver(monitorMutate);
    observer.observe(document, { childList: true, subtree: true });
  };

  /* Global */

  const umami = (eventValue) => trackEvent(eventValue);
  umami.trackView = trackView;
  umami.trackEvent = trackEvent;

  inject("umami", umami);

  window.umami = umami;

  /* Start */

  if (autoTrack && !trackingDisabled()) {
    history.pushState = hook(history, "pushState", handlePush);
    history.replaceState = hook(history, "replaceState", handlePush);

    const update = () => {
      if (document.readyState === "complete") {
        trackView();

        if (cssEvents) {
          addEvents(document);
          observeDocument();
        }
      }
    };

    document.addEventListener("readystatechange", update, true);

    update();
  }
};
