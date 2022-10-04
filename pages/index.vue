<template>
  <div class="wiki-app">
    <div class="wiki-app__search">
      <div class="wiki-app__logo">
        <WikiLogo />
      </div>
      <WikiPcSearch />
      <WikiSuggestion :data="WikiData" />
      <WikiDetailPopups target=".wiki-suggestion" />
    </div>
    <WikiFooter :is-home="true" />
  </div>
</template>

<script>
import WikiPcSearch from "../components/pc/WikiPcSearch.vue";
import WikiDetailPopups from "../components/WikiDetailPopups.vue";
import WikiFooter from "../components/WikiFooter.vue";
import WikiLogo from "../components/WikiLogo.vue";
import WikiSuggestion from "../components/WikiSuggestion.vue";

export default {
  name: "WikiHome",
  components: {
    WikiPcSearch,
    WikiLogo,
    WikiFooter,
    WikiSuggestion,
    WikiDetailPopups,
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

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-app {
  text-align: left;
  background-color: $wiki-common-white;
  text-align: center;
  margin: auto;
}

.wiki-app__search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  max-width: $wiki-max-width;
  min-width: $wiki-min-width;
  margin: auto;
}

.wiki-app__search .wiki-search {
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
  margin-bottom: 40px;
  max-width: $wiki-max-width;
  min-width: $wiki-min-width;
  z-index: 10;
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

  .wiki-app__search .wiki-search {
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
    padding-top: 190px;
    padding-left: 1rem;
    padding-right: 1rem;
    min-height: auto;
    flex-direction: column;
  }
}
</style>

<style lang="scss">
@import "@/assets/css/variables.scss";

@media only screen and (max-width: 500px) {
  .wiki-app__logo {
    .wiki-logo {
      display: flex;
      flex-direction: row;
      width: auto;
      max-width: 100%;
    }

    .wiki-logo__box img {
      width: 5rem;
    }

    .wiki-logo__text {
      margin: auto;
      font-size: 2.5rem;
    }

    .wiki-logo__tips {
      margin: auto;
      transform: translateY(-2em);
    }
  }
}

.wiki-app__search .wiki-search {
  .wiki-search__input {
    input {
      height: 3rem !important;
      font-size: 1.1rem !important;
      color: $wiki-content-black !important;
      /* border: 1px solid $wiki-description-gray !important; */
      background-color: $wiki-search-mirror-gray !important;
      border: 1px solid $wiki-header-gray !important;

      &:focus,
      &:hover,
      &.wiki-search__input--query {
        color: $wiki-content-black !important;
        border: 1px solid $wiki-description-gray !important;
        background-color: $wiki-common-white !important;
      }
    }

    .wiki-search__list {
      padding-top: 0.5rem;
      box-shadow: 0 2px 3px rgb(0 0 0 / 10%) !important;
      border-bottom: 1px solid $wiki-suggest-border-gray !important;
      background-color: $wiki-common-white !important;
      z-index: 100;
    }

    .wiki-search__item,
    .wiki-search__item-tips {
      border-bottom: none !important;
      justify-content: flex-start !important;
      padding: 0.25rem 0 !important;
      margin: 0.5rem 1rem !important;
      font-size: 1.1rem !important;
    }

    .wiki-search__link {
      line-height: 1.5 !important;
    }

    .wiki-search__go--icon {
      display: none !important;
    }
  }
}

.wiki-app {
  .wiki-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $wiki-common-white;
    z-index: 1;
    color: $wiki-description-gray;

    .wiki-footer__box {
      display: block;
      position: relative;
      padding: 20px 0;
      text-align: center;
    }

    .wiki-footer__fill,
    .wiki-footer__tips {
      display: none;
    }
  }
}
</style>
