<template>
  <section class="wiki-item-information">
    <div class="wiki-item-title">{{ title }}</div>
    <div class="wiki-item-description">{{ description }}</div>
  </section>
</template>

<script>
export default {
  name: "WikiPcItemInformation",
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
  margin-top: 2rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.wiki-item-title {
  color: #000;
  font-size: 2.5rem;
  font-weight: 700;
}

.wiki-item-description {
  color: #666;
  font-size: 1rem;
  font-weight: 400;
}
</style>
