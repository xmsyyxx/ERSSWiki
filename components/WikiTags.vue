<template>
  <div v-if="tags !== []" class="wiki-tags">
    <ul class="wiki-tags-list">
      <li v-for="tag of tags" :key="tag" class="wiki-tags-item">
        <!-- <span class="wiki-tag-icon"><IconTag /></span> -->
        <span class="wiki-tag-text">{{ tag }}</span>
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

<style scoped>
.wiki-tags {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.wiki-tags-list {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  user-select: none;
}

.wiki-tags-item {
  word-break: break-word;
  border: 1px solid var(--wiki-card-border-gray);
  border-radius: 6px;
  background-color: var(--wiki-card-gray);
  padding: 0 5px;
  font-weight: 500;
}

.wiki-tags-item::before {
  content: "# ";
}

.wiki-tags-item:not(:first-child) {
  margin-left: 1rem;
}

@media only screen and (min-width: 500px) {
  .wiki-tags {
    width: 69%;
  }

  .wiki-tags-list {
    margin-bottom: 0;
  }
}
</style>
