<template>
  <div class="wiki-information">
    <div class="wiki-information__title">{{ title }}</div>
    <div class="wiki-information__description">{{ description }}</div>
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
.wiki-information {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}

.wiki-information__title {
  color: var(--wiki-title-black);
  font-size: 1.7rem;
  font-weight: 700;
}

.wiki-information__description {
  color: var(--wiki-description-black);
  font-size: 0.8rem;
  font-weight: 400;
}
</style>
