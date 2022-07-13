<template>
  <div class="wiki-header">
    <div class="wiki-header-nav">
      <NuxtLink to="/" class="wiki-icon-home">
        <IconHome />
      </NuxtLink>
      <div class="wiki-logo-text">
        <NuxtLink to="/">
          耳斯百科
          <span class="wiki-phone-tips"> &middot; 手机版</span>
        </NuxtLink>
      </div>
      <WikiSearch />
      <div class="wiki-tips"></div>
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

.wiki-logo-text > a {
  color: #333;
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

.wiki-tips {
  display: none;
}

.wiki-logo-text {
  font-size: 1rem;
  font-weight: 700;
  width: 66.67%; /* 8/12 */
  text-align: center;
}

@media only screen and (min-width: 500px) {
  .wiki-header {
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
  }

  .wiki-header-nav {
    max-width: 1180px;
    min-width: 960px;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .wiki-phone-tips {
    display: none;
  }

  .wiki-logo-text {
    font-size: 1.5rem;
    width: 16.67%; /* 4/24 */
  }

  .wiki-tips {
    display: block;
    width: 50%; /* 12/24 */
  }

  .wiki-icon-home {
    display: none;
  }
}
</style>
