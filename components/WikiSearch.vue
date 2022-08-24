<template>
  <div class="wiki-search">
    <div
      v-if="!isStartSearch"
      class="wiki-icon-search"
      @click="onClickSearchIcon"
    >
      <IconSearch />
    </div>
    <div v-else class="wiki-search__container">
      <div class="wiki-search__input">
        <input
          v-model="searchQuery"
          type="search"
          autocomplete="off"
          placeholder="搜索"
          class="wiki--click--WikiSearchInput"
          @blur="onInputBlur"
        />
        <div class="wiki-search__suggest">
          <ul v-if="articles.length" class="wiki-search__list">
            <NuxtLink
              v-for="article of articles"
              :key="article.title"
              :to="'/wiki/' + article.title"
            >
              <div class="wiki-search__link" @click="isStartSearch = false">
                <li class="wiki-search__item">
                  <span>{{ article.title }}</span>
                  <div class="wiki-search__go-icon">
                    <IconEnter />
                  </div>
                </li>
              </div>
            </NuxtLink>
          </ul>
          <ul v-if="!articles.length && searchTips" class="wiki-search__list">
            <li class="wiki-search__item--tips">{{ searchTips }}</li>
          </ul>
          <ul
            v-else-if="isStartSearch && !articles.length && searchQuery"
            class="wiki-search__list"
          >
            <li class="wiki-search__item--tips">无结果</li>
          </ul>
          <div class="wiki-search__return" @click="isStartSearch = false">
            返回
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconEnter from "./icons/IconEnter.vue";
import IconSearch from "./icons/IconSearch.vue";

export default {
  name: "WikiSearch",
  components: {
    IconSearch,
    IconEnter,
  },
  data() {
    return {
      isStartSearch: false,
      searchQuery: "",
      searchTips: "",
      articles: [],
      isFetchContent: false,
    };
  },
  watch: {
    async searchQuery(query) {
      if (!query) {
        this.articles = [];
        return;
      }
      this.isStartSearch = true;
      this.searchTips = "搜索中……";
      this.articles = [];
      this.$nuxt.$loading.start();
      let search = await this.$content("wiki")
        .only(["title", "tags"])
        .sortBy("case_insensitive__title", "asc")
        .fetch();
      if (!this.isFetchContent) {
        this.$umami.trackEvent("WikiContent", "fetch");
        this.isFetchContent = true;
      }
      this.searchTips = "";
      this.$nuxt.$loading.finish();
      query = query.toLocaleLowerCase();
      search = search.filter((content) => {
        if (content.title.toString().toLocaleLowerCase().includes(query)) {
          // console.log("匹配");
          return content;
        }
        return null;
      });
      this.articles = search;
    },
  },
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
  methods: {
    onClickSearchIcon() {
      this.isStartSearch = true;
    },
    onInputBlur() {
      this.searchTips = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-search {
  font-size: 1.5rem;
  width: 16.67%; /* 2/12 */
  text-align: center;
  color: $wiki-search-black;
  z-index: 100;
}
.wiki-search__container {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $wiki-common-white;
  min-height: 100vh;
}

.wiki-search__input {
  margin-left: 1rem;
  margin-right: 1rem;
  height: 2.5rem;
  background: $wiki-common-white;
  margin-top: 1rem;
}

.wiki-search__input > input {
  width: 100% !important;
  box-sizing: border-box;
  height: 2.2rem;
  font-size: 1rem;
  color: $wiki-content-black;
  outline: 0;
  margin-bottom: 1rem;
  margin-top: 0;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0;
  transform: translateY(-0.5rem);
  border-radius: 15px;
  border: 1px solid $wiki-search-border-gray;
}

.wiki-search__suggest {
  overflow-y: auto;
  max-height: 100vh;
}

.wiki-search__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid $wiki-search-border-gray;
}

.wiki-search__item {
  position: relative;
  display: flex;
  font-size: 1rem;
  border-bottom: 1px solid $wiki-suggest-border-gray;
}

.wiki-search__item {
  color: $wiki-search-black;
}

.wiki-search__go-icon {
  position: absolute;
  color: $wiki-content-black;
  right: 0;
}

.wiki-search__return {
  color: $wiki-content-black;
  font-size: 1rem;
}

.wiki-search__item--tips {
  position: relative;
  font-size: 1rem;
  border-bottom: 1px solid $wiki-suggest-border-gray;
}

.wiki-search__link {
  width: 100%;
}
</style>
