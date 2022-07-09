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

<style>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "Poppins", sans-serif;
}

::-webkit-scrollbar {
  width: 12px !important;
  height: 12px !important;
  cursor: pointer !important;
}

::-webkit-scrollbar-thumb {
  height: 50px !important;
  border: 2px solid #f0f0f0 !important;
  border-radius: 6px !important;
  outline: 2px solid #f0f0f0 !important;
  outline-offset: -2px !important;
  background-color: #bbb !important;
}

::-webkit-scrollbar-track-piece {
  border-radius: 0 !important;
  background-color: #f0f0f0 !important;
}
</style>
