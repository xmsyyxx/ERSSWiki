<template>
  <div class="wiki-contents">
    <WikiHeader />
    <div class="wiki-contents__body">
      <Nuxt />
    </div>
    <div class="wiki-contents__fill"></div>
    <div class="wiki-contents__footer">
      <WikiFooter />
    </div>
    <WikiFancyImage />
    <WikiBackTop />
    <WikiCommon />
  </div>
</template>

<script>
import WikiHeader from "../components/WikiHeader.vue";
import WikiFooter from "../components/WikiFooter.vue";
import WikiCommon from "../components/WikiCommon.vue";
import WikiFancyImage from "../components/WikiFancyImage.vue";
import WikiBackTop from "../components/WikiBackTop.vue";

export default {
  name: "WikiContents",
  components: {
    WikiHeader,
    WikiFooter,
    WikiCommon,
    WikiFancyImage,
    WikiBackTop,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-contents {
  min-height: 100vh;
  background-color: #eaecf0;
}

.wiki-contents__body {
  text-align: left;
  padding-top: 44px;
  background-color: $wiki-common-white;
  word-break: break-word;
}

.wiki-contents__fill {
  display: none;
}

@media only screen and (min-width: 500px) {
  .wiki-contents__body {
    padding-top: 60px;
    display: flex;
    height: 100%;
  }

  .wiki-contents__fill {
    width: 100%;
  }
}
</style>
