<template>
  <div class="wiki-contents">
    <WikiHeader />
    <div class="wiki-body">
      <Nuxt />
    </div>
    <div class="wiki-space-fill"></div>
    <div class="wiki-content-footer"><WikiFooter /></div>
  </div>
</template>

<script>
import WikiHeader from "../components/WikiHeader.vue";
import WikiFooter from "../components/WikiFooter.vue";

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
  background-color: var(--wiki-common-white);
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
