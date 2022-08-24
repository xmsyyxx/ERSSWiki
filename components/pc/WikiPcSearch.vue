<template>
  <div class="wiki-search">
    <div class="wiki-search__input">
      <input
        v-model="searchQuery"
        type="search"
        autocomplete="off"
        :placeholder="placeholder"
        class="wiki--click--WikiSearchInput"
        :class="{ 'wiki-search__input--query': searchQuery }"
        @blur="onInputBlur"
        @click="onClicnSearchInput"
      />
      <ul v-if="isStartSearch && articles.length" class="wiki-search__list">
        <NuxtLink
          v-for="article of articles"
          :key="article.title"
          :to="path + article.title"
        >
          <div class="wiki-search__link" @click="isStartSearch = false">
            <li class="wiki-search__item">
              <span>{{ article.title }}</span>
              <div class="wiki-search__go--icon">
                <IconEnter />
              </div>
            </li>
          </div>
        </NuxtLink>
      </ul>
      <ul v-if="!articles.length && searchTips" class="wiki-search__list">
        <li class="wiki-search__item-tips">{{ searchTips }}</li>
      </ul>
      <ul
        v-else-if="isStartSearch && !articles.length && searchQuery"
        class="wiki-search__list"
      >
        <li class="wiki-search__item-tips">无结果</li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconEnter from "../icons/IconEnter.vue";

export default {
  name: "WikiPcSearch",
  components: {
    IconEnter,
  },
  data() {
    return {
      path: "/item/",
      placeholder: "搜索词条",
      isStartSearch: false,
      searchTips: "",
      searchQuery: "",
      articles: [],
      isFetchContent: false,
    };
  },
  watch: {
    async searchQuery(query) {
      if (!query) {
        this.articles = [];
        this.searchTips = "尝试搜索点什么……";
        return;
      }
      this.isStartSearch = true;
      this.searchTips = "搜索中……";
      this.articles = [];
      this.$nuxt.$loading.start();
      let search = await this.$content("wiki")
        .only(["title", "tags", "alias"])
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
  mounted() {
    const onresize = () => {
      this.path = window.outerWidth < 500 ? "/wiki/" : "/item/";
    };
    onresize();
    window.addEventListener("resize", onresize);
  },
  methods: {
    onClicnSearchInput() {
      this.searchTips = "尝试搜索点什么……";
      this.isStartSearch = true;
      this.placeholder = "";
    },
    onInputBlur() {
      this.placeholder = "搜索词条";
      this.searchTips = "";
      // // this.articles = [];
      // this.isStartSearch = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-search {
  font-size: 1.5rem;
  width: 33.33%; /* 8/24 */
  text-align: center;
  color: $wiki-search-black;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wiki-search__container {
  display: block;
  position: relative;
  background-color: transparent;
}

.wiki-search__input {
  height: 40px;
  margin: auto;
  width: 100%;
}

.wiki-search__link {
  width: 100%;
  line-height: 44px;
}

.wiki-search__link:hover {
  background-color: $wiki-search-light-gray;
}

.wiki-search__input > input {
  width: 100%;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.8rem;
  color: $wiki-search-black;
  outline: 0;
  margin-bottom: 0;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0;
  transform: translateY(-0.5rem);
  border-radius: 4px;
  background-color: $wiki-search-mirror-gray;
  border: 1px $wiki-header-gray solid;

  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}

.wiki-search__input > input:focus,
.wiki-search__input > input:hover {
  background-color: $wiki-common-white;
  border: 1px $wiki-search-gray solid;
}

.wiki-search__input-icon {
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 1.5rem;
}

.wiki-search__list {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: $wiki-common-white;
  padding: 1rem;
  padding-top: 0;
  overflow-y: auto;
  max-height: 250px;
  box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
  border-bottom: 1px solid $wiki-search-border-gray;
}

.wiki-search__item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  font-size: 1rem;
  border-bottom: 1px solid $wiki-suggest-border-gray;
}

.wiki-search__item {
  color: $wiki-search-black;
}

.wiki-search__go--icon {
  position: absolute;
  color: $wiki-content-black;
  right: 0;
}

.wiki-search__item-tips {
  position: relative;
  font-size: 1rem;
  border-bottom: 1px solid $wiki-suggest-border-gray;
}
</style>
