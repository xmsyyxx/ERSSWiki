<template>
  <section class="wiki-hot">
    <div class="wiki-hot-tips">最新词条</div>
    <div class="wiki-hot-list">
      <ul>
        <li class="wiki-hot-item"></li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "WikiHot",
  async asyncData({ $content }) {
    const WikiData = await $content("wiki")
      .only(["title", "slug", "updatedAt"])
      .sortBy("updatedAt", "desc")
      .fetch();
    // console.log(WikiData);
    return {
      WikiData,
    };
  },
};
</script>

<style scoped>
.wiki-hot-list ul {
  margin: 1rem;
  padding: 0;
  list-style: none;
}
</style>
