<template>
  <div class="wiki-contents">
    <WikiHeader />
    <div class="wiki-contents__body">
      <Nuxt />
    </div>
    <div class="wiki-contents__fill"></div>
    <div class="wiki-contents__footer"><WikiFooter /></div>
    <WikiCommon />
  </div>
</template>

<script>
import WikiHeader from "../components/WikiHeader.vue";
import WikiFooter from "../components/WikiFooter.vue";
import WikiCommon from "../components/WikiCommon.vue";

export default {
  name: "WikiContents",
  components: {
    WikiHeader,
    WikiFooter,
    WikiCommon,
  },
};
</script>

<style scoped>
.wiki-contents__body {
  text-align: left;
  padding-top: 44px;
  background-color: var(--wiki-common-white);
  word-break: break-word;
}

.wiki-contents__fill {
  width: 100%;
  height: 0.7rem;
  background-color: var(--wiki-footer-light-gray);
  border: 0;
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
