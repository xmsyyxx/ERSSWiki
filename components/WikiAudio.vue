<template>
  <div class="wiki-audio">
    <div class="wiki-audio__box">
      <!-- <pre class="aplayer-lrc-content">
        <slot></slot>
    </pre> -->
    </div>
    <label v-if="title && isLoad" class="wiki-audio__description">
      <span class="wiki-audio__tips">
        <span class="wiki-audio__tips--icon"><IconUp /></span>
        {{ title }}
      </span>
    </label>
  </div>
</template>

<script>
import { loadCss, loadJs } from "../assets/js/init";
import IconUp from "./icons/IconUp.vue";

export default {
  name: "WikiAudio",
  components: {
    IconUp,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
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
    // 为什么嵌套两个 Promise 而不直接 Promise.all ？
    // 因为部分浏览器不支持 Promise.all （指微信QQ这类）
    loadJs("https://staticoss.xhemj.work/npm/aplayer/1.10.1/APlayer.min.js")
      .then(() => {
        return loadCss(
          "https://staticoss.xhemj.work/npm/aplayer/1.10.1/APlayer.min.css"
        );
      })
      .then(() => {
        const player = new window.APlayer({
          container: document.querySelector(".wiki-audio__box"),
          audio: [
            {
              name: this.name,
              artist: "耳斯百科",
              url: this.src,
              cover:
                "https://wikioss.xhemj.work/static/logo/v3/white.png/normal.webp",
            },
          ],
          //   lrcType: 2,
          theme: "#5755d9",
          loop: "none",
        });
        player.on("loadedmetadata", () => {
          this.isLoad = true;
        });
        window.WikiAudioPlayer = player;
      });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-audio {
  text-align: center;
  margin: 0.5rem 0;
  padding: 0.5rem;
}

.wiki-audio__box {
  width: 100%;
  margin: 0;
}

@media only screen and (min-width: 500px) {
  .wiki-audio__box {
    height: auto;
    padding: 0.5rem;
  }
}

.wiki-audio__description {
  display: flex;
  flex-direction: column;
  color: $wiki-description-gray;
  font-size: 0.8rem;
}

.wiki-audio__tips {
  line-height: 0;
}

.wiki-audio__tips--icon {
  font-size: 1rem;
}
</style>

<style lang="scss">
@import "@/assets/css/variables.scss";

.wiki-audio__box {
  .aplayer-author {
    display: none;
  }

  .aplayer-music {
    color: $wiki-title-black;
    font-weight: 500;
    //   text-align: left;
  }

  //   .aplayer-lrc-contents p {
  //     text-align: center;
  //   }
}
</style>
