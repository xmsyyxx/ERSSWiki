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
}

.wiki-space-fill {
  width: 100vw;
  height: 0.7rem;
  background-color: #f5f5f5;
  border: 0;
}
</style>

<style>
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
