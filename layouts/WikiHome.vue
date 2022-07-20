<template>
  <div class="wiki-body">
    <Nuxt />
    <WikiLog />
  </div>
</template>

<script>
import WikiLog from "../components/WikiLog.vue";

export default {
  name: "WikiHome",
  components: {
    WikiLog,
  },
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

<style scoped>
.wiki-body {
  text-align: left;
  background-color: #fff;
}
</style>
