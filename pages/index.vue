<template>
  <div class="wiki-app">
    <div class="wiki-app__search">
      <div class="wiki-app__logo">
        <WikiLogo />
      </div>
      <WikiPcSearch />
    </div>
    <WikiFooter is-home="true" />
  </div>
</template>

<script>
import WikiPcSearch from "../components/pc/WikiPcSearch.vue";
import WikiFooter from "../components/WikiFooter.vue";
import WikiLogo from "../components/WikiLogo.vue";

export default {
  name: "WikiHome",
  components: {
    WikiPcSearch,
    WikiLogo,
    WikiFooter,
  },
  layout: "WikiHome",
  hooks: {
    "content:file:beforeInsert": (document) => {
      if (document.extension === ".md") {
        Object.entries(document).forEach(([key, value]) => {
          const _key = `case_insensitive__${key}`; // prefix is arbitrary
          if (!document[_key] && typeof value === "string") {
            document[_key] = value.toLocaleLowerCase();
          }
        });
      }
    },
  },
  async asyncData({ $content }) {
    const WikiData = await $content("wiki")
      .only(["title", "slug"])
      .sortBy("case_insensitive__title", "asc")
      .fetch();
    // console.log(WikiData);
    return {
      WikiData,
    };
  },
};
</script>

<style scoped>
.wiki-app {
  text-align: left;
  background-color: var(--wiki-common-white);
  text-align: center;
  margin: auto;
}

.wiki-app__search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: var(--wiki-max-width);
  min-width: var(--wiki-min-width);
  margin: auto;
}

.wiki-app__search > .wiki-search {
  display: block;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  width: 714px;
}

.wiki-app__logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1.5rem;
  width: 16.67%;
  font-weight: 700;
  text-align: center;
  margin-top: -120px;
  margin-bottom: 60px;
  max-width: var(--wiki-max-width);
  min-width: var(--wiki-min-width);
}

.wiki-app__logo {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  font-size: 40px;
  user-select: none;
}

@media only screen and (max-width: 500px) {
  .wiki-app__logo {
    width: 100%;
    max-width: none;
    min-width: 0;
    margin-top: -120px;
    margin-bottom: 30px;
  }

  .wiki-app__search > .wiki-search {
    width: 100%;
    max-width: none;
    min-width: 0;
  }

  .wiki-app__search {
    display: flex;
    width: 100%;
    max-width: none;
    min-width: 0;
    justify-content: flex-start;
    padding-top: 200px;
    padding-left: 1rem;
    padding-right: 1rem;
    min-height: auto;
    flex-direction: column;
  }
}
</style>

<style>
.wiki-app__search > .wiki-search > .wiki-search__input > input {
  height: 50px !important;
  font-size: 1.1rem !important;
  color: var(--wiki-content-black) !important;
  /* border: 1px solid var(--wiki-description-gray) !important; */
  background-color: var(--wiki-search-mirror-gray) !important;
  border: 1px solid var(--wiki-header-gray) !important;
}

.wiki-app__search > .wiki-search > .wiki-search__input > input:focus,
.wiki-app__search > .wiki-search > .wiki-search__input > input:hover,
.wiki-app__search
  > .wiki-search
  > .wiki-search__input
  > input.wiki-search__input--query {
  color: var(--wiki-content-black) !important;
  border: 1px solid var(--wiki-description-gray) !important;
  background-color: var(--wiki-common-white) !important;
}
.wiki-app__search > .wiki-search > .wiki-search__input > .wiki-search__list {
  box-shadow: 0 2px 3px rgb(0 0 0 / 10%) !important;
  border-bottom: 1px solid var(--wiki-suggest-border-gray) !important;
  background-color: var(--wiki-common-white) !important;
  z-index: 100;
}

.wiki-app__search
  > .wiki-search
  > .wiki-search__input
  > ul
  > a
  > .wiki-search__link
  > .wiki-search__item,
.wiki-app__search > .wiki-search > .wiki-search__input > ul > li {
  border-bottom: none !important;
  justify-content: flex-start !important;
  margin: 1rem !important;
  font-size: 1.1rem;
}

.wiki-app__search > .wiki-search > .wiki-search__input > ul > a :hover {
  background-color: var(--wiki-search-light-gray) !important;
}

.wiki-app__search
  > .wiki-search
  > .wiki-search__input
  > ul
  > a
  > .wiki-search__link
  > .wiki-search__item
  > .wiki-search__go--icon {
  display: none;
}

.wiki-app > .wiki-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--wiki-common-white);
  z-index: 1;
}

.wiki-app > .wiki-footer > .wiki-footer__box {
  display: block;
  position: relative;
  padding: 20px 0;
  text-align: center;
}

.wiki-app > .wiki-footer > .wiki-footer__box > .wiki-footer__fill,
.wiki-app > .wiki-footer > .wiki-footer__box > .wiki-footer__tips {
  display: none;
}

.wiki-app > .wiki-footer {
  font-size: 0.1rem;
  color: var(--wiki-description-gray);
}
</style>
