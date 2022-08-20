<template>
  <WikiPicture :src="src" :title="title" />
</template>

<script>
import WikiPicture from "../WikiPicture.vue";

export default {
  name: "WImg",
  components: {
    WikiPicture,
  },
  props: {
    src: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
