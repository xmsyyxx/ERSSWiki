<template>
  <div class="wiki-contents">
    <WikiPcHeader />
    <div class="wiki-body">
      <Nuxt />
    </div>
    <div class="wiki-space-fill"></div>
    <WikiFancyImage />
    <WikiFooter />
    <WikiLog />
  </div>
</template>

<script>
import WikiPcHeader from "../components/pc/WikiPcHeader.vue";
import WikiFancyImage from "../components/WikiFancyImage.vue";
import WikiFooter from "../components/WikiFooter.vue";
import WikiLog from "../components/WikiLog.vue";

export default {
  name: "WikiPcContents",
  components: {
    WikiPcHeader,
    WikiFooter,
    WikiFancyImage,
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
  padding-top: 60px;
  background-color: #fff;
  word-break: break-word;

  display: flex;
  height: 100%;
}

.wiki-space-fill {
  width: 100%;
}
</style>

<style>
body {
  overflow-x: auto;
}
</style>
