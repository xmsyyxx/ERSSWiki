<template>
  <div class="wiki-header">
    <div class="wiki-header__nav">
      <div class="wiki-header__logo wiki--click--WikiLogo">
        <div class="wiki-header__logo--item">
          <picture class="wiki-logo__image">
            <source
              type="image/webp"
              srcset="
                https://wikioss.xhemj.work/static/logo/v3/512x512.png/normal.webp
              "
            />
            <img src="https://wikioss.xhemj.work/static/logo/v3/512x512.png" />
          </picture>
        </div>
        <NuxtLink to="/"> {{ $t("MAIN_ERSSWIKI") }} </NuxtLink>
      </div>
      <WikiPcSearch />
      <div class="wiki-header__tips">
        <div class="wiki-header__tips-item">
          {{ $t("MAIN_DEVELOPMENT") }} v{{ version }}
        </div>
        <!-- <span class="wiki-header__language">
          <span @click="lang = 'en'">
            <nuxt-link v-if="lang === 'zh'" :to="switchLocalePath('en')">
              English
            </nuxt-link>
          </span>
          <span @click="lang = 'zh'">
            <nuxt-link v-if="lang === 'en'" :to="switchLocalePath('zh')">
              中文
            </nuxt-link>
          </span>
        </span> -->
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
      lang: this.$i18n.locale,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-header {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  color: $wiki-content-black;
  line-height: 44px;
  background-color: $wiki-header-mirror-gray;
  user-select: none;
  z-index: 1000;
  width: 100%;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid $wiki-border-gray;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  border-image: linear-gradient(
    $wiki-header-light-gray,
    $wiki-header-light-gray
  );
}

.wiki-header__logo > a {
  color: $wiki-content-black;
}

.wiki-header__nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  max-width: $wiki-max-width;
  min-width: $wiki-min-width;
  justify-content: space-around;
  height: 100%;
  margin: 0 auto;
}

.wiki-header__logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 1.5rem;
  width: 16.67%; /* 4/24 */
  font-weight: 700;
  text-align: center;
}

.wiki-header__logo--item {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.wiki-logo__image img {
  width: 40px;
}

.wiki-header__tips {
  display: flex;
  width: 50%; /* 12/24 */
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 1rem;
}

.wiki-header__tips-item {
  font-weight: 500;
  font-size: 0.8rem;
}

.wiki-header__language {
  margin-left: 1rem;
}
</style>
