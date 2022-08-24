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

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-body {
  text-align: left;
  background-color: $wiki-common-white;
}
</style>
