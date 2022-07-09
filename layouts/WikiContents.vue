<template>
  <div class="wiki-contents">
    <WikiHeader />
    <div class="wiki-body">
      <Nuxt />
    </div>
    <div class="wiki-space-fill"></div>
    <WikiFooter />
  </div>
</template>

<script>
import WikiFooter from "../components/WikiFooter";
import WikiHeader from "../components/WikiHeader";

export default {
  name: "WikiContents",
  components: {
    WikiHeader,
    WikiFooter,
  },
};
</script>

<style scoped>
.wiki-body {
  text-align: left;
  padding-top: 44px;
  background-color: #fff;
  word-break: break-all;
}

.wiki-space-fill {
  width: 100vw;
  height: 0.7rem;
  background-color: #f5f5f5;
  border: 0;
}
</style>
