<template>
  <section v-if="tags !== []" class="wiki-tags">
    <ul class="wiki-tags-list">
      <li v-for="tag of tags" :key="tag" class="wiki-tags-item">
        <!-- <span class="wiki-tag-icon"><IconTag /></span> -->
        <span class="wiki-tag-text">{{ tag }}</span>
      </li>
    </ul>
  </section>
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
  width: 69%;
}

.wiki-tags-list {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin-left: 1rem;
  user-select: none;
}

.wiki-tags-item {
  word-break: break-word;
  border: 1px solid #f1f2f3;
  border-radius: 6px;
  background-color: #f6f7f8;
  padding: 0 5px;
  font-weight: 500;
}

.wiki-tags-item::before {
  content: "# ";
}

.wiki-tags-item:not(:first-child) {
  margin-left: 1rem;
}
</style>
