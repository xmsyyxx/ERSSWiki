<template>
  <div class="wiki-contents">
    <WikiPcHeader />
    <div class="wiki-body">
      <Nuxt />
    </div>
    <div class="wiki-space-fill"></div>
    <WikiFooter />
  </div>
</template>

<script>
import WikiPcHeader from "../components/pc/WikiPcHeader";
import WikiFooter from "../components/WikiFooter";

export default {
  name: "WikiPcContents",
  components: {
    WikiPcHeader,
    WikiFooter,
  },
};
</script>

<style scoped>
.wiki-body {
  text-align: left;
  padding-top: 60px;
  background-color: #fff;
  word-break: break-all;

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
