<template>
  <div class="wiki-app">
    <div class="wiki-app-search">
      <div class="wiki-app-logo">
        <WikiLogo />
      </div>
      <WikiPcSearch />
    </div>
    <!-- <ul class="wiki-all-list">
      <li v-for="article of WikiData" :key="article.slug" class="krz-list">
        <NuxtLink :to="'/wiki/' + article.slug">{{ article.title }}</NuxtLink>
      </li>
    </ul> -->
  </div>
</template>

<script>
import WikiPcSearch from "../components/pc/WikiPcSearch.vue";
import WikiLogo from "../components/WikiLogo.vue";

export default {
  name: "WikiHome",
  components: {
    WikiPcSearch,
    WikiLogo,
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
  mounted() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(async function (registrations) {
          for (const registration of registrations) {
            await registration.unregister();
          }
        });
    }
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

.wiki-app-search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: var(--wiki-max-width);
  min-width: var(--wiki-min-width);
  margin: auto;
}

.wiki-app-search > .wiki-search {
  display: block;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  width: 714px;
}

.wiki-app-logo {
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

.wiki-app-logo {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  font-size: 40px;
  user-select: none;
}

.wiki-all-list {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

.wiki-development-tips {
  font-size: 1rem;
  float: right;
}

@media only screen and (max-width: 500px) {
  .wiki-app-logo {
    width: 100%;
    max-width: none;
    min-width: 0;
    margin-top: -120px;
    margin-bottom: 30px;
  }

  .wiki-app-search > .wiki-search {
    width: 100%;
    max-width: none;
    min-width: 0;
  }

  .wiki-app-search {
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
.wiki-app-search > .wiki-search > .wiki-search-input > input {
  height: 50px !important;
  background-color: #fff !important;
  font-size: 1rem !important;
  color: #222 !important;
  border: 1px solid #999 !important;
}

.wiki-app-search > .wiki-search > .wiki-search-input > input:focus,
.wiki-app-search > .wiki-search > .wiki-search-input > input:hover {
  color: #222 !important;
  border: 1px solid #999 !important;
}
.wiki-app-search > .wiki-search > .wiki-search-input > .wiki-search-list {
  box-shadow: 0 2px 3px rgb(0 0 0 / 10%) !important;
  border-bottom: 1px solid #e2e2e2 !important;
  background-color: #fff !important;
}

.wiki-app-search
  > .wiki-search
  > .wiki-search-input
  > ul
  > a
  > .wiki-search-link
  > .wiki-search-item,
.wiki-app-search > .wiki-search > .wiki-search-input > ul > li {
  border-bottom: none !important;
  justify-content: flex-start !important;
  margin: 1rem !important;
  font-size: 1.1rem;
}

.wiki-app-search > .wiki-search > .wiki-search-input > ul > a :hover {
  background-color: #fafafa !important;
}

.wiki-app-search
  > .wiki-search
  > .wiki-search-input
  > ul
  > a
  > .wiki-search-link
  > .wiki-search-item
  > .wiki-search-go-icon {
  display: none;
}
</style>
