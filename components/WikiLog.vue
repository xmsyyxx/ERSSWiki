<template>
  <div class="wiki-log"></div>
</template>

<script>
export default {
  name: "WikiLog",
  beforeMount() {
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
    loadJs(
      "https://s-sh-1943-static.oss.dogecdn.com/xhemj.com/js/chunk-32d23b45.js",
      { async: "async" }
    ).then(function () {
      if (
        !window.isInitXhs &&
        location.hostname !== "log.xhemj.top" &&
        location.hostname !== "local.xhemj.work"
      ) {
        return window._xhs.new(
          "33cf0150-d77d-4d35-8fe8-fc8b4e876800",
          undefined,
          function () {
            console.log("aaa");
            window.isInitXhs = true;
          }
        );
      }
    });
  },
};
</script>

<style scoped>
.wiki-log {
  display: none;
}
</style>
