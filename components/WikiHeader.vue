<template>
  <div class="wiki-header">
    <div class="wiki-header-nav">
      <NuxtLink to="/" class="wiki-icon-home wiki--click--WikiHomeIcon">
        <IconHome />
      </NuxtLink>
      <div class="wiki-logo-text">
        <NuxtLink to="/"> 耳斯百科 &middot; 开发版 </NuxtLink>
      </div>
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
  color: var(--wiki-content-black);
  line-height: 44px;
  background-color: var(--wiki-common-white);
  user-select: none;
  z-index: 1000;
  width: 100vw;

  border-bottom: 1px solid var(--wiki-border-gray);
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  border-image: linear-gradient(
    var(--wiki-light-white),
    var(--wiki-light-white)
  );
}

.wiki-logo-text > a {
  color: var(--wiki-content-black);
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
  color: var(--wiki-content-black);
}

.wiki-tips {
  display: none;
}

.wiki-logo-text {
  font-size: 1rem;
  font-weight: 700;
  width: 66.67%; /* 8/12 */
  text-align: center;
}
</style>
