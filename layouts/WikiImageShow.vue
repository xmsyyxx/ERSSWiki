<template>
  <div class="wiki-image-show">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: "WikiImageShow",
  mounted() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register("https://baike.xmsyyxx.com/sw@v1.js")
          .then(function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          })
          .catch(function (err) {
            console.log("ServiceWorker registration failed: ", err);
          });
      });
    }
  },
};
</script>
