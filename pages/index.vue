<template>
  <div class="wiki-app">
    <div class="wiki-contruction">主页施工中……</div>
    <div class="wiki-all">
      <div class="wiki-all-tips">所有条目：</div>
      <ul class="wiki-all-list">
        <li v-for="article of WikiData" :key="article.slug" class="krz-list">
          <NuxtLink :to="'/wiki/' + article.slug">{{ article.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import WikiHot from "../components/WikiHot.vue";

export default {
  name: "WikiHome",
  components: {
    // WikiHot,
  },
  layout: "WikiContents",
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
  padding-top: 44px;
  background-color: #fff;
  text-align: center;
  margin: auto;
}

.wiki-all-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
