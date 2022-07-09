<template>
  <div class="wiki-app">
    <!-- <WikiHot /> -->
    <NuxtLink to="/wiki/厦门市音乐学校"> 厦门市音乐学校 </NuxtLink>
    <NuxtLink to="/wiki/跑面"> 跑面 </NuxtLink>
  </div>
</template>

<script>
// import WikiHot from "../components/WikiHot.vue";

export default {
  name: "WikiHome",
  components: {
    // WikiHot,
  },
  layout: "WikiContents",
};
</script>

<style scoped>
.wiki-body {
  text-align: left;
  padding-top: 44px;
  background-color: #fff;
}
</style>
