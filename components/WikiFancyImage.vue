<template>
  <CoolLightBox
    :items="items"
    :index="index"
    @close="index = null"
  ></CoolLightBox>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  name: "WikiFancyImage",
  components: {
    CoolLightBox,
  },
  data() {
    return {
      index: null,
      src: "",
      title: "",
    };
  },
  computed: {
    items() {
      return [
        {
          title: this.title || "",
          src: this.src,
        },
      ];
    },
  },
  mounted() {
    const self = this;
    this.$nuxt.$on("WikiFancyImage", function (data) {
      //   console.log("onWikiFancyImage");
      self.src = data.src;
      self.title = data.title;
      self.index = 0;
    });
  },
  destroyed() {
    this.$nuxt.$off("WikiFancyImage");
  },
};
</script>

<style lang="scss">
.cool-lightbox-caption {
  h6 {
    color: #fff !important;
  }

  p {
    font-size: 10px !important;
  }
}
</style>
