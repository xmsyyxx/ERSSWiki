<template>
  <div class="wiki-video">
    <div class="wiki-video__box"></div>
    <label v-if="title && isLoad" class="wiki-video__description">
      <span class="wiki-video__tips">
        <span class="wiki-video__tips--icon"><IconUp /></span>
        {{ title }}
      </span>
    </label>
  </div>
</template>

<script>
import { loadJs } from "../assets/js/init";
import IconUp from "./icons/IconUp.vue";

export default {
  name: "WikiVideo",
  components: {
    IconUp,
  },
  props: {
    vcode: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  mounted() {
    loadJs("https://player.dogecloud.com/js/loader.js").then(() => {
      const player =
        window.DogePlayer &&
        new window.DogePlayer({
          container: document.querySelector(".wiki-video__box"),
          userId: 1943,
          vcode: this.vcode,
          autoPlay: false,
        });
      player.on("infoLoaded", () => {
        this.isLoad = true;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-video {
  text-align: center;
  margin: 0.5rem 0;
}

.wiki-video__box {
  width: 100%;
}

@media only screen and (min-width: 500px) {
  .wiki-video__box {
    width: auto;
    height: auto;
    min-width: calc($wiki-min-width * 0.69);
    min-height: 350px;
    padding: 0.5rem;
  }
}

.wiki-video__description {
  display: flex;
  flex-direction: column;
  color: $wiki-description-gray;
  font-size: 0.8rem;
}

.wiki-video__tips {
  line-height: 0;
}

.wiki-video__tips--icon {
  font-size: 1rem;
}
</style>
