(function () {
  const SW_VERSION = "20220721-1";

  const SW_VERSION_KEY = "baike-sw-version";
  const getVersion = function () {
    return localStorage.getItem(SW_VERSION_KEY);
  };
  const writeVersion = function (version) {
    return localStorage.setItem(SW_VERSION_KEY, version);
  };
  window.addEventListener("load", function () {
    if ("serviceWorker" in navigator) {
      if (getVersion() !== SW_VERSION) {
        navigator.serviceWorker
          .getRegistrations()
          .then(async function (registrations) {
            for (let registration of registrations) {
              await registration.unregister();
            }
            console.log("ServiceWorker unregistered successfully.");
          });
      }
      navigator.serviceWorker
        .register(window.location.origin + "/sw@v2.js")
        .then(function (registration) {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
          writeVersion(SW_VERSION);
        })
        .catch(function (err) {
          console.log("ServiceWorker registration failed: ", err);
          writeVersion(null);
        });
    }
  });

  window.isInitXhs = window.isInitXhs || false;
  function loadJs(src, opt) {
    return new Promise(function (resolve) {
      const script = document.createElement("script");
      const head = document.getElementsByTagName("head")[0];
      script.type = "text/javascript";
      script.src = src;
      if (opt) {
        for (const key in opt) {
          script[key] = opt[key];
        }
      }
      if (script.addEventListener) {
        script.addEventListener("load", resolve, false);
      } else if (script.attachEvent) {
        script.attachEvent("onreadystatechange", function () {
          const target = window.event.srcElement;
          if (target.readyState === "loaded") resolve();
        });
      }
      head.appendChild(script);
    });
  }
  loadJs("https://staticoss.xhemj.work/xhemj.com/js/chunk-32d23b45.js", {
    async: "async",
  }).then(function () {
    if (
      !window.isInitXhs &&
      location.hostname !== "log.xhemj.top" &&
      location.hostname !== "local.xhemj.work"
    ) {
      return window._xhs.new(
        "33cf0150-d77d-4d35-8fe8-fc8b4e876800",
        undefined,
        function () {
          window.isInitXhs = true;
        }
      );
    }
  });
})();
