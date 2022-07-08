<template>
  <div class="wiki-base-introductions" v-if="this.data">
    <p class="wiki-introduction-text" v-for="text of introductions" :key="text">
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
      return this.data && this.data.split("\n");
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
