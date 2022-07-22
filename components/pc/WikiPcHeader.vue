<template>
  <div class="wiki-header">
    <div class="wiki-header-nav">
      <div class="wiki-logo-text wiki--click--WikiLogo">
        <div class="wiki-logo">
          <img src="https://wikioss.xhemj.work/static/logo/64x64.png" alt="" />
        </div>
        <NuxtLink to="/"> 耳斯百科 </NuxtLink>
      </div>
      <WikiPcSearch />
      <div class="wiki-tips">
        <div class="wiki-development-tips">开发版 v0.1.0-beta7</div>
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
  background-color: #edf2f7;
  user-select: none;
  z-index: 1000;
  width: 100vw;

  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  border-image: linear-gradient(#edf2f7f2, #edf2f7f2);
}

.wiki-logo-text > a {
  color: #333;
}

.wiki-header-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  max-width: 1190px;
  min-width: 960px;
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
