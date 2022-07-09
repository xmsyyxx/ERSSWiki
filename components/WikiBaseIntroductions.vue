<template>
  <div v-if="data" class="wiki-base-introductions">
    <p v-for="text of introductions" :key="text" class="wiki-introduction-text">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  name: "WikiBaseIntroductions",
  props: {
    data: String,
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
  margin: 1rem;
  font-weight: 200;
  font-size: 1rem;
  color: #000;
}
</style>
