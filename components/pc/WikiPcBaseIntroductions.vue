<template>
  <div v-if="data" class="wiki-introductions">
    <p
      v-for="text of introductions"
      :key="text"
      class="wiki-introductions__text"
    >
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  name: "WikiPcBaseIntroductions",
  props: {
    data: {
      type: String,
      default: "",
    },
  },
  computed: {
    introductions() {
      return (
        this.data &&
        this.data.split("\n").filter((content) => {
          return content && content.trim();
        })
      );
    },
  },
};
</script>

<style scoped>
.wiki-introductions {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  font-weight: 400;
  font-size: 1rem;
  color: var(--wiki-description-black);
  margin-bottom: 5rem;
}
</style>
