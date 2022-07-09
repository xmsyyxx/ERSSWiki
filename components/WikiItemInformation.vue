<template>
  <div class="wiki-item-information">
    <div class="wiki-title-part">
      <div class="wiki-item-title">{{ title }}</div>
      <div class="wiki-item-description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiItemInformation",
  props: {
    title: String,
    description: String,
  },
};
</script>

<style scoped>
.wiki-title-part {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.wiki-item-title {
  color: #000;
  font-size: 1.7rem;
  font-weight: 700;
}

.wiki-item-description {
  color: #666;
  font-size: 0.8rem;
  font-weight: 400;
}
</style>
