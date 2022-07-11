<template>
  <div class="wiki-header">
    <div class="wiki-header-nav">
      <NuxtLink to="/" class="wiki-icon-home">
        <IconHome />
      </NuxtLink>
      <div class="wiki-logo-text">耳斯百科 &middot; 手机版</div>
      <WikiSearch />
    </div>
  </div>
</template>

<script>
import IconHome from "./icons/IconHome.vue";
import WikiSearch from "./WikiSearch.vue";

export default {
  name: "WikiHeader",
  components: {
    WikiSearch,
    IconHome,
  },
};
</script>

<style scoped>
.wiki-header {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  color: #333;
  line-height: 44px;
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid #e6e6e6;
  z-index: 1000;
  width: 100vw;
}

.wiki-header-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
}

.wiki-icon-home {
  font-size: 1.5rem;
  width: 16.67%; /* 2/12 */
  text-align: center;
  color: #000;
}

.wiki-logo-text {
  font-size: 1rem;
  font-weight: 700;
  width: 66.67%; /* 8/12 */
  text-align: center;
}
</style>
