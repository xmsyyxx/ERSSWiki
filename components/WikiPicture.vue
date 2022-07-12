<template>
  <section class="wiki-picture">
    <img :src="src" :alt="alt" class="wiki-picture-img" />
    <label v-if="alt" class="wiki-picture-description">
      <span class="wiki-picture-icon"><IconUp /></span> {{ alt }}
    </label>
  </section>
</template>

<script>
import IconUp from "./icons/IconUp.vue";

export default {
  name: "WikiPicture",
  components: {
    IconUp,
  },
  props: {
    src: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.wiki-picture {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
}

.wiki-picture-img {
  width: 100%;
}

.wiki-picture-description {
  color: #999;
  font-size: 0.1rem;
}

.wiki-picture-icon {
  font-size: 1rem;
}
</style>
