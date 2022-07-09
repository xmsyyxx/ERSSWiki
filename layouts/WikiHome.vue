<template>
  <div class="wiki-home">
    <WikiHeader />
    <div class="wiki-body">
      <Nuxt />
    </div>
    <WikiFooter />
  </div>
</template>

<script>
import WikiFooter from "../components/WikiFooter.vue";
import WikiHeader from "../components/WikiHeader.vue";

export default {
  name: "WikiHome",
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
}
</style>
