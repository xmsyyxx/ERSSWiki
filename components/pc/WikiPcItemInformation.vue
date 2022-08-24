<template>
  <div class="wiki-information">
    <div class="wiki-information__title">{{ title }}</div>
    <div class="wiki-information__description">
      <div
        v-for="item of descriptions"
        :key="item"
        class="wiki-information__description--item"
      >
        {{ item }}
      </div>
    </div>
  </div>
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

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-information {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  margin-top: 2rem;
}

.wiki-information__title {
  color: $wiki-title-black;
  font-size: 2.5rem;
  font-weight: 700;
}

.wiki-information__description {
  color: $wiki-description-black;
  font-size: 1rem;
  font-weight: 400;
}
</style>
