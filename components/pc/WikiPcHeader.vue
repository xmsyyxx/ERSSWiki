<template>
  <div class="wiki-header">
    <div class="wiki-header-nav">
      <div class="wiki-logo-text">
        <div class="wiki-logo"><img src="/64x64.png" alt="" /></div>
        <NuxtLink to="/"> 耳斯百科 </NuxtLink>
      </div>
      <WikiPcSearch />
      <div class="wiki-tips"></div>
    </div>
  </div>
</template>

<script>
import WikiPcSearch from "./WikiPcSearch.vue";

export default {
  name: "WikiPcHeader",
  components: {
    WikiPcSearch,
  },
};
</script>

<style scoped>
.wiki-header {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  color: #333;
  line-height: 44px;
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid #e6e6e6;
  z-index: 1000;
  width: 100vw;
}

.wiki-logo-text > a {
  color: #333;
}

.wiki-header-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  max-width: 1180px;
  min-width: 960px;
  justify-content: space-around;
  height: 100%;
  margin: 0 auto;
}

.wiki-logo-text {
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  width: 16.67%; /* 4/24 */
  font-weight: 700;
  text-align: center;
}

.wiki-logo {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.wiki-logo img {
  width: 32px;
}

.wiki-tips {
  display: block;
  width: 50%; /* 12/24 */
}
</style>
