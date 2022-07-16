<template>
  <div class="wiki-body">
    <Nuxt />
    <WikiLog />
  </div>
</template>

<script>
import WikiLog from "../components/WikiLog.vue";

export default {
  name: "WikiHome",
  components: {
    WikiLog,
  },
};
</script>

<style scoped>
.wiki-body {
  text-align: left;
  background-color: #fff;
}
</style>
