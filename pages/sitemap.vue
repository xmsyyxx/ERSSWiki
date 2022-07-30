<template>
  <div class="wiki-sitemap">
    <div class="wiki-sitemap-box">
      <h1 class="wiki-sitemap-title">所有百科</h1>
      <ul>
        <li
          v-for="item of WikiData"
          :key="item.title"
          class="wiki-sitemap-item"
        >
          <a :href="'/item/' + item.slug">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiSitemap",
  layout: "WikiPcContents",
  async asyncData({ $content }) {
    const WikiData = await $content("wiki")
      .only(["title", "slug"])
      .sortBy("updatedAt", "desc")
      .fetch();
    return {
      WikiData,
    };
  },
  head() {
    return {
      title: "站点地图 - 耳斯百科",
    };
  },
};
</script>

<style scoped>
.wiki-sitemap {
  width: 100%;
}

.wiki-sitemap ul {
  list-style: none;
  padding: 0;
}

.wiki-sitemap-box {
  text-align: center;
}
</style>
