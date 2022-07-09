<template>
  <div class="wiki-picture">
    <img :src="src" :alt="name" class="wiki-picture-img" />
    <label v-if="name" class="wiki-picture-description">{{ name }} 图片</label>
  </div>
</template>

<script>
export default {
  name: "WikiPicture",
  props: {
    src: String,
    name: String,
  },
};
</script>

<style scoped>
.wiki-picture {
  width: 100%;
  text-align: center;
}

.wiki-picture-img {
  width: 100%;
}

.wiki-head-description {
  color: #999;
  font-size: 0.1rem;
}
</style>
