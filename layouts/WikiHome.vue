<template>
  <div class="wiki-body">
    <Nuxt />
    <WikiCommon />
  </div>
</template>

<script>
import WikiCommon from "../components/WikiCommon.vue";

export default {
  name: "WikiHome",
  components: {
    WikiCommon,
  },
};
</script>

<style scoped>
.wiki-body {
  text-align: left;
  background-color: var(--wiki-common-white);
}
</style>
