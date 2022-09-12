<template>
  <div v-if="data" class="wiki-introductions">
    <p
      v-for="text of introductions"
      :key="text"
      class="wiki-introductions__text"
      v-html="renderHtml(text)"
    ></p>
  </div>
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
  methods: {
    renderHtml(markdown) {
      return this.$md.render(markdown);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-introductions {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  font-weight: 400;
  font-size: 1rem;
  color: $wiki-description-black;
}

@media screen and (min-width: 500px) {
  .wiki-introductions {
    margin-bottom: 5rem;
  }
}
</style>
