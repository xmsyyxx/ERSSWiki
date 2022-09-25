<template>
  <div class="wiki-header">
    <div class="wiki-header__nav">
      <NuxtLink
        to="/"
        class="wiki-header__icon--home wiki--click--WikiHomeIcon"
      >
        <IconHome />
      </NuxtLink>
      <div class="wiki-header__logo--text">
        <NuxtLink to="/">
          {{ $t("MAIN_ERSSWIKI") }} &middot; {{ $t("MAIN_DEVELOPMENT") }}
        </NuxtLink>
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

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-header {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  color: $wiki-content-black;
  line-height: 44px;
  background-color: $wiki-common-mirror-white;
  user-select: none;
  z-index: 1000;
  width: 100%;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid $wiki-border-gray;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  border-image: linear-gradient($wiki-light-white, $wiki-light-white);
}

.wiki-header__logo--text > a {
  color: $wiki-content-black;
}

.wiki-header__nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
}

.wiki-header__icon--home {
  font-size: 1.5rem;
  width: 16.67%; /* 2/12 */
  text-align: center;
  color: $wiki-content-black;
}

.wiki-tips {
  display: none;
}

.wiki-header__logo--text {
  font-size: 1rem;
  font-weight: 700;
  width: 66.67%; /* 8/12 */
  text-align: center;
}
</style>
