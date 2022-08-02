<template>
  <div class="wiki-image__show">
    <nuxt />
    <WikiCommon />
  </div>
</template>

<script>
import WikiCommon from "../components/WikiCommon.vue";

export default {
  name: "WikiImageShow",
  components: {
    WikiCommon,
  },
};
</script>
