<template>
  <div class="wiki-contents">
    <WikiHeader />
    <div class="wiki-body">
      <Nuxt />
    </div>
    <div class="wiki-space-fill"></div>
    <WikiFancyImage />
    <div class="wiki-content-footer"><WikiFooter /></div>
    <WikiLog />
  </div>
</template>

<script>
import WikiHeader from "../components/WikiHeader.vue";
import WikiFancyImage from "../components/WikiFancyImage.vue";
import WikiFooter from "../components/WikiFooter.vue";
import WikiLog from "../components/WikiLog.vue";

export default {
  name: "WikiContents",
  components: {
    WikiHeader,
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
  padding-top: 44px;
  background-color: #fff;
  word-break: break-word;
}

.wiki-space-fill {
  width: 100%;
  height: 0.7rem;
  background-color: #f5f5f5;
  border: 0;
}

@media only screen and (min-width: 500px) {
  .wiki-body {
    padding-top: 60px;
    display: flex;
    height: 100%;
  }

  .wiki-space-fill {
    width: 100%;
  }
}
</style>
