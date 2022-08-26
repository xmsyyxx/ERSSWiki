<template>
  <div
    v-if="isShow"
    ref="popups"
    class="wiki-popups"
    :class="{
      'wiki-popups__show': isShow,
      'wiki-popups__fadein': isFadeIn,
      'wiki-popups__fadeout': isFadeOut,
    }"
    :style="{ left: left + 'px', top: top + 'px' }"
    @mouseenter="isMouseEnterModule = true"
    @mouseleave="onLeaveModule"
  >
    <div class="wiki-popups__arrow"></div>
    <div class="wiki-popups__module">
      <div class="wiki-popups__text">
        <p>
          <span v-if="wikiImg" class="wiki-popups__img">
            <WikiPicture :clickable="false" :src="wikiImg" />
          </span>
          <strong v-if="wikiName">{{ wikiName }}：</strong>{{ wikiDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import WikiPicture from "./WikiPicture.vue";

export default {
  name: "WikiDetailPopups",
  components: {
    WikiPicture,
  },
  data() {
    return {
      left: 0,
      top: 0,
      isShow: false,
      isFadeIn: false,
      isFadeOut: false,
      isMouseEnterModule: false,

      targetText: "",
      wikiName: "",
      wikiDescription: "",
      wikiImg: "",
    };
  },
  watch: {
    async isShow() {
      if (!this.isShow) return;
      const name = this.targetText;
      let WikiData = {};
      try {
        WikiData = await this.$content("wiki", name, { text: true }).fetch();
      } catch {
        WikiData = {};
      }

      const rawWikiText = WikiData.text
        ? String(WikiData.text)
            .replace(/[#]{1,6} ?(.*?)(\n|\r)/g, "") // 去除标题
            .replace(/\[\^\d+?\]/g, "") // 去除上标脚注
            .replace(/---/g, "") // 去除分隔线
            .replace(/\n/g, "") // 去除换行符
            .replace(/<WImg(.*?)><\/WImg>/g, "") // 去除图片
            .replace(/<WikiVideo(.*?)><\/WikiVideo>/g, "") // 去除视频
            .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // 去除链接
            .replace(/<(.*?)>/g, "") // 去除html标签
            .replace(/ ?TODO ?/g, "")
        : ""; // 去除TODO

      let description =
        WikiData.introduction ||
        rawWikiText ||
        WikiData.description ||
        "百科信息获取失败";

      if (description.length > 100) {
        description = description.substring(0, 100) + "...";
      }
      if (String(description).startsWith(name)) {
        description = description.replace(
          new RegExp(`(${name}|${WikiData.title})，?`),
          ""
        );
      }
      this.wikiName = WikiData.title;
      this.wikiDescription = description;
      this.wikiImg = WikiData.img || "";
    },
  },
  mounted() {
    Array.from(document.querySelectorAll("p > a")).forEach((element) => {
      element.onmouseenter = debounce(this.openPopups, 50);
      element.onmouseleave = debounce(this.closePopups, 50);
    });
  },
  methods: {
    openPopups(e) {
      e.preventDefault();
      if (this.isShow) return;

      const linkElement = e.path[0];
      const left = linkElement.offsetLeft;
      const top = linkElement.offsetTop;

      this.targetText = linkElement.innerText;
      this.left = left;
      this.top = top + 30;
      this.wikiName = "";
      this.wikiDescription = "";
      this.wikiImg = "";
      this.isShow = true;

      this.isFadeIn = true;
      setTimeout(() => {
        this.isFadeIn = false;
      }, 300);
    },
    closePopups(e) {
      e && e.preventDefault();
      if (!this.isShow || this.isMouseEnterModule) return;

      this.isFadeOut = true;
      setTimeout(() => {
        this.isShow = false;
        this.isFadeOut = false;
      }, 200);
    },
    onLeaveModule() {
      if (this.isShow) {
        this.isMouseEnterModule = false;
        setTimeout(this.closePopups, 50);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-popups {
  display: none;
  position: absolute;
  background: $wiki-common-white;
  font-size: 1rem;
  line-height: 20px;
  min-width: 300px;
  color: $wiki-description-black;
  border-radius: 2px;
  box-shadow: 0 30px 90px -20px rgb(0 0 0 / 30%), 0 0 1px 1px rgb(0 0 0 / 5%);
  z-index: 50;
}

.wiki-popups.wiki-popups__show {
  display: block;
}

@keyframes popups-fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes popups-fade-out-down {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translateY(30px);
  }
}

.wiki-popups.wiki-popups__fadein {
  animation: popups-fade-in-up 0.3s ease-in-out;
}

.wiki-popups.wiki-popups__fadeout {
  animation: popups-fade-out-down 0.3s ease-in-out;
}

.wiki-popups__arrow {
  $arrow-height: 10px;
  $arrow-margin-left: 10px;
  border: $arrow-height solid transparent;
  border-radius: 0;
  border-bottom-color: #fff;
  width: 0;
  position: absolute;
  left: $arrow-margin-left;
  top: calc($arrow-height * -2);
}

.wiki-popups__module {
  display: flex;
  background: #fff;
  flex-direction: column;
  align-content: flex-start;
}

.wiki-popups__text {
  padding-top: 7px;
  overflow: hidden;
  padding-bottom: 0;
  margin: 16px;
  width: 300px;

  p {
    text-indent: 0;
    margin-bottom: 10px;
  }
}

.wiki-popups__img {
  display: flex;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
}
</style>
