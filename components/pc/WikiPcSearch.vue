<template>
  <section class="wiki-search">
    <div class="wiki-search-input">
      <input
        v-model="searchQuery"
        type="search"
        autocomplete="off"
        placeholder="搜索"
        @blur="onInputBlur"
      />
      <ul v-if="isStartSearch && articles.length" class="wiki-search-list">
        <NuxtLink
          v-for="article of articles"
          :key="article.title"
          :to="'/item/' + article.title"
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
      <ul v-if="!articles.length && searchQuery" class="wiki-search-list">
        <li class="wiki-search-item-no-resoult">无结果</li>
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
  data() {
    return {
      isStartSearch: false,
      searchQuery: "",
      articles: [],
    };
  },
  watch: {
    async searchQuery(query) {
      if (!query) {
        this.articles = [];
        return;
      }
      this.isStartSearch = true;
      let search = await this.$content("wiki")
        .only(["title", "tags"])
        .sortBy("case_insensitive__title", "asc")
        .fetch();
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
  color: #000;
}
.wiki-search-container {
  display: block;
  position: relative;
  background-color: transparent;
}

.wiki-search-input {
  height: 2.5rem;
  background: #fff;
  border-radius: 2rem;
  margin: auto;
  margin-top: 8px;
}

.wiki-search-input > input {
  width: 100% !important;
  box-sizing: border-box;
  height: 2rem;
  font-size: 1rem;
  color: #333;
  outline: 0;
  margin-bottom: 0;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0;
  transform: translateY(-0.5rem);
  border-radius: 4px;
  border: 1px solid #ccc;
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
  border-bottom: 1px solid #cccccc;
  background-color: #fff;
  padding: 1rem;
  padding-top: 0;
  overflow-y: auto;
  max-height: 250px;
}

.wiki-search-item {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  border-bottom: 1px solid #ededed;
}

.wiki-search-item a {
  color: #333;
}

.wiki-search-go-icon {
  position: absolute;
  color: #333;
  right: 0;
}

.wiki-search-item-no-resoult {
  position: relative;
  font-size: 1rem;
  border-bottom: 1px solid #ededed;
}

.wiki-search-link {
  width: 100%;
}
</style>
