<template>
  <div class="wiki-picture">
    <div class="wiki-picture__fill"></div>

    <div class="wiki-picture__box">
      <picture
        class="wiki-picture__img"
        :class="{ 'wiki--click--WikiPicture': clickable }"
      >
        <source v-if="!isGif" type="image/webp" :srcset="src + webpSuffix" />
        <img
          :src="src + (!isGif ? suffix : '')"
          :alt="title"
          :title="title"
          :class="{ 'wiki-picture__clickable': clickable }"
          @load="onNormalLoad"
          @click="onClickPicture"
        />
      </picture>
      <label v-if="title" class="wiki-picture__description">
        <span class="wiki-picture__tips">
          <span class="wiki-picture__tips--icon"><IconUp /></span>
          {{ title }}
        </span>
        <div class="wiki-picture__tips--item">
          {{ $t("MAIN_LARGER_IMAGE_TIPS") }}
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { isSupportWebp } from "../assets/js/init";
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
    title: {
      type: String,
      default: "",
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    thumbSuffix: {
      type: String,
      default: "/thumb",
    },
    normalSuffix: {
      type: String,
      default: "/normal",
    },
  },
  data() {
    return {
      suffix: this.thumbSuffix + ".jpg",
      webpSuffix: this.thumbSuffix + ".webp",
    };
  },
  computed: {
    isPreFetchBot() {
      const search = window.location.search;
      const URLSearchParams = window.URLSearchParams;
      return (
        URLSearchParams && !!(new URLSearchParams(search).get("bot") === "1")
      );
    },
    isGif() {
      return String(this.src).endsWith(".gif");
    },
  },
  methods: {
    onNormalLoad() {
      if (this.isPreFetchBot) return;
      this.suffix = this.normalSuffix + ".jpg";
      this.webpSuffix = this.normalSuffix + ".webp";
    },
    onClickPicture() {
      if (!this.clickable) return;
      const suffix = "/normal" + (isSupportWebp() ? ".webp" : ".jpg");
      const url = this.src + (this.isGif ? "" : suffix);
      this.$nuxt.$emit("WikiFancyImage:show", {
        src: url,
        title: this.title,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-picture {
  display: flex;
  flex-direction: column;
  text-align: center;
  /* image-rendering: pixelated; */
}

.wiki-picture__box {
  display: flex;
  flex-direction: column;
}

.wiki-picture__img {
  width: 100%;
}

.wiki-picture__img > img {
  max-width: 100%;
  width: auto;
}

.wiki-picture__clickable {
  cursor: pointer;
}

.wiki-picture__description {
  display: flex;
  flex-direction: column;
  color: $wiki-description-gray;
  font-size: 0.8rem;
}

.wiki-picture__tips {
  line-height: 0;
}

.wiki-picture__tips--icon {
  font-size: 1rem;
}

.wiki-picture__tips--item {
  font-size: 0.5rem;
}

.wiki-picture__img > img {
  max-height: 300px;
}

@media only screen and (min-width: 500px) {
  .nuxt-content > .wiki-picture {
    display: flex;
    flex-direction: row;
    max-width: 100%;
  }

  .nuxt-content > .wiki-picture > .wiki-picture__box {
    width: 40%;
  }

  .nuxt-content > .wiki-picture > .wiki-picture__fill {
    width: 70%;
  }

  .wiki-picture__img {
    width: 100%;
  }
}
</style>

<style>
.nuxt-content > .wiki-picture {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
