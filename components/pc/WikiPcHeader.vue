<template>
  <div class="wiki-header">
    <div class="wiki-header-nav">
      <div class="wiki-logo-text wiki--click--WikiLogo">
        <div class="wiki-logo">
          <img
            src="https://wikioss.xhemj.work/static/logo/64x64.png"
            title="耳斯百科"
          />
        </div>
        <NuxtLink to="/"> 耳斯百科 </NuxtLink>
      </div>
      <WikiPcSearch />
      <div class="wiki-tips">
        <div class="wiki-development-tips">开发版 {{ version }}</div>
      </div>
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
  data() {
    return {
      version: require("~/package.json").version,
    };
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
  color: var(--wiki-content-black);
  line-height: 44px;
  background-color: var(--wiki-header-gray);
  user-select: none;
  z-index: 1000;
  width: 100vw;

  border-bottom: 1px solid var(--wiki-border-gray);
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  border-image: linear-gradient(
    var(--wiki-header-light-gray),
    var(--wiki-header-light-gray)
  );
}

.wiki-logo-text > a {
  color: var(--wiki-content-black);
}

.wiki-header-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  max-width: var(--wiki-max-width);
  min-width: var(--wiki-min-width);
  justify-content: space-around;
  height: 100%;
  margin: 0 auto;
}

.wiki-logo-text {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
  display: flex;
  width: 50%; /* 12/24 */
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 1rem;
}

.wiki-development-tips {
  font-weight: 500;
  font-size: 0.8rem;
}
</style>
