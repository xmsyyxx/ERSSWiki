<template>
  <section class="wiki-item-information">
    <div class="wiki-item-title">{{ title }}</div>
    <div class="wiki-item-description">
      <div v-for="item of descriptions" :key="item" class="wiki-description">
        {{ item }}
      </div>
    </div>
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
  computed: {
    descriptions() {
      return (
        this.description &&
        this.description.split("\n").filter((content) => {
          return content && content.trim();
        })
      );
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
  color: var(--wiki-title-black);
  font-size: 2.5rem;
  font-weight: 700;
}

.wiki-item-description {
  color: var(--wiki-description-black);
  font-size: 1rem;
  font-weight: 400;
}
</style>
