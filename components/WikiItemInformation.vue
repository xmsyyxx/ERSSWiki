<template>
  <div class="wiki-item-information">
    <div class="wiki-item-title">{{ title }}</div>
    <div class="wiki-item-description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: "WikiItemInformation",
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.wiki-item-information {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.wiki-item-title {
  color: var(--wiki-title-black);
  font-size: 1.7rem;
  font-weight: 700;
}

.wiki-item-description {
  color: var(--wiki-description-black);
  font-size: 0.8rem;
  font-weight: 400;
}
</style>
