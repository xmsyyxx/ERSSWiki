<template>
  <div class="wiki-contents">
    <WikiPcHeader />
    <div class="wiki-contents__body">
      <Nuxt />
    </div>
    <div class="wiki-contents__fill"></div>
    <WikiFooter />
    <WikiCommon />
  </div>
</template>

<script>
import WikiPcHeader from "../components/pc/WikiPcHeader.vue";
import WikiCommon from "../components/WikiCommon.vue";
import WikiFooter from "../components/WikiFooter.vue";

export default {
  name: "WikiPcContents",
  components: {
    WikiPcHeader,
    WikiFooter,
    WikiCommon,
  },
};
</script>

<style scoped>
.wiki-contents__body {
  text-align: left;
  padding-top: 60px;
  background-color: var(--wiki-common-white);
  word-break: break-word;

  display: flex;
  height: 100%;
}

.wiki-contents__fill {
  width: 100%;
}
</style>

<style>
body {
  overflow-x: auto;
}
</style>
