<template>
  <div v-if="tags !== []" class="wiki-tags">
    <ul class="wiki-tags__list">
      <li v-for="tag of tags" :key="tag" class="wiki-tags__item">
        <!-- <span class="wiki-tag-icon"><IconTag /></span> -->
        <span class="wiki-tags__item--text">{{ tag }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// import IconTag from "./icons/IconTag.vue";

export default {
  name: "WikiTags",
  components: {
    // IconTag,
  },
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-tags {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.wiki-tags__list {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin: 1rem;
  margin-top: 0;
}

.wiki-tags__item {
  word-break: break-word;
  border: 1px solid $wiki-card-border-gray;
  border-radius: 6px;
  background-color: $wiki-card-gray;
  padding: 0 5px;
  font-weight: 500;
}

.wiki-tags__item::before {
  content: "# ";
}

.wiki-tags__item:not(:first-child) {
  margin-left: 1rem;
}

@media only screen and (min-width: 500px) {
  .wiki-tags {
    width: 69%;
  }

  .wiki-tags__list {
    margin-bottom: 0;
  }
}
</style>
