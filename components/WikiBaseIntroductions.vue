<template>
  <section v-if="data" class="wiki-base-introductions">
    <p v-for="text of introductions" :key="text" class="wiki-introduction-text">
      {{ text }}
    </p>
  </section>
</template>

<script>
export default {
  name: "WikiBaseIntroductions",
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
.wiki-base-introductions {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  font-weight: 200;
  font-size: 1rem;
  color: #000;
}
</style>
