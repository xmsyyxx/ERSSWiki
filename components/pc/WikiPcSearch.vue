<template>
  <section class="wiki-search">
    <div class="wiki-search-input">
      <input
        v-model="searchQuery"
        type="search"
        autocomplete="off"
        :placeholder="placeholder"
        @click="onClicnSearchInput"
        @blur="onInputBlur"
      />
      <ul v-if="isStartSearch && articles.length" class="wiki-search-list">
        <NuxtLink
          v-for="article of articles"
          :key="article.title"
          :to="path + article.title"
        >
          <div class="wiki-search-link" @click="isStartSearch = false">
            <li class="wiki-search-item">
              <span>{{ article.title }}</span>
              <div class="wiki-search-go-icon">
                <IconEnter />
              </div>
            </li>
          </div>
        </NuxtLink>
      </ul>
      <ul v-if="!articles.length && searchTips" class="wiki-search-list">
        <li class="wiki-search-item-tips">{{ searchTips }}</li>
      </ul>
      <ul
        v-else-if="isStartSearch && !articles.length && searchQuery"
        class="wiki-search-list"
      >
        <li class="wiki-search-item-tips">无结果</li>
      </ul>
    </div>
  </section>
</template>

<script>
import IconEnter from "../icons/IconEnter.vue";

export default {
  name: "WikiPcSearch",
  components: {
    IconEnter,
  },
  props: {
    path: {
      type: String,
      default: "/item/",
    },
  },
  data() {
    return {
      placeholder: "搜索词条",
      isStartSearch: false,
      searchTips: "",
      searchQuery: "",
      articles: [],
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

<style scoped>
.wiki-search {
  font-size: 1.5rem;
  width: 33.33%; /* 8/24 */
  text-align: center;
  color: #4a5568;
  z-index: 100;
}

.wiki-search-container {
  display: block;
  position: relative;
  background-color: transparent;
}

.wiki-search-input {
  height: 2.5rem;
  border-radius: 2rem;
  margin: auto;
  /* margin-top: 8px; */
}

.wiki-search-input > input {
  width: 100%;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.8rem;
  color: #4a5568;
  outline: 0;
  margin-bottom: 0;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0;
  transform: translateY(-0.5rem);
  border-radius: 4px;
  background-color: #e2e8f0;
  border: 1px #f1eeee solid;

  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}

.wiki-search-input > input:focus,
.wiki-search-input > input:hover {
  background-color: #fff;
  border: 1px #e2e8f0 solid;
}

.wiki-search-input-icon {
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 1.5rem;
}

.wiki-search-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #fff;
  padding: 1rem;
  padding-top: 0;
  overflow-y: auto;
  max-height: 250px;
  box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
  border-bottom: 1px solid #e2e2e2;
}

.wiki-search-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  font-size: 1rem;
  border-bottom: 1px solid #ededed;
}

.wiki-search-item {
  color: #4a5568;
}

.wiki-search-go-icon {
  position: absolute;
  color: #333;
  right: 0;
}

.wiki-search-item-tips {
  position: relative;
  font-size: 1rem;
  border-bottom: 1px solid #ededed;
}

.wiki-search-link {
  width: 100%;
}
</style>
