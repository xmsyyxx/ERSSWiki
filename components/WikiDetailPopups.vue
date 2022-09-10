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
    :style="{ left: left, top: top, bottom: bottom }"
    @mouseenter="isMouseEnterModule = true"
    @mouseleave="onLeaveModule"
  >
    <div
      class="wiki-popups__arrow"
      :class="'wiki-arrow__' + arrowPosition"
    ></div>
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
import getWikiDescription from "../assets/js/getWikiDescription";
import WikiPicture from "./WikiPicture.vue";

export default {
  name: "WikiDetailPopups",
  components: {
    WikiPicture,
  },
  data() {
    return {
      left: "",
      top: "",
      bottom: "",
      isShow: false,
      isFadeIn: false,
      isFadeOut: false,
      isMouseEnterModule: false,
      arrowPosition: "top",
      targetText: "",
      wikiName: "",
      wikiDescription: "",
      wikiImg: "",

      timerWaitOpen: null,
      timerWaitClose: null,
    };
  },
  watch: {
    isMouseEnterModule() {
      if (this.isMouseEnterModule) {
        clearTimeout(this.timerWaitClose);
      } else {
        clearTimeout(this.timerWaitOpen);
      }
    },
    async isShow() {
      if (!this.isShow) return;
      const name = this.targetText;
      let WikiData = {};
      try {
        WikiData = await this.$content("wiki", name, { text: true }).fetch();
      } catch {
        WikiData = {};
      }

      let description = getWikiDescription(WikiData) || "百科信息获取失败";

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
    this.onMounted();
    const observer = new MutationObserver(this.onMounted);
    observer.observe(document.querySelector(".wiki-contents__body"), {
      attributes: true,
      childList: true,
      subtree: true,
    });
  },
  methods: {
    onMounted() {
      Array.from(document.querySelectorAll("p > a")).forEach((element) => {
        // 绑定点击事件，
        // 执行开启和关闭都延时，
        // 时间过后若鼠标仍在上面才显示弹窗。
        element.onmouseenter = (e) => {
          this.isMouseEnterModule = true;
          this.timerWaitOpen = setTimeout(async () => {
            const nowElementTargetText = e.path[0].textContent;
            // 防止在等待时鼠标移动到别的链接去
            if (this.targetText && this.targetText !== nowElementTargetText) {
              await this.closePopups(true); // 强制关闭当前弹窗
              this.openPopups(e);
            } else if (this.isMouseEnterModule) {
              return this.openPopups(e);
            }
          }, 350);
        };
        element.onmouseleave = () => {
          this.isMouseEnterModule = false;
          this.timerWaitClose = setTimeout(() => {
            if (!this.isMouseEnterModule) {
              return this.closePopups();
            }
          }, 350);
        };
      });
    },
    async openPopups(e) {
      e && e.preventDefault();
      if (this.isShow) {
        await this.closePopups();
      }

      return new Promise((resolve) => {
        const linkElement = e.path[0];
        const left = linkElement.offsetLeft;
        const top = linkElement.offsetTop;

        // TODO:
        // 过了一半多的屏幕则改变弹窗位置
        // 计算弹窗位置
        // const scroll = window.scrollY;
        // const targetPosition = top - scroll;
        // const windowHeight = window.innerHeight;
        // this.arrowPosition =
        //   targetPosition > windowHeight / 1.5 ? "bottom" : "top";
        this.arrowPosition = "top";

        this.left = left + "px";
        // if (this.arrowPosition === "top") {
        this.top = top + 30 + "px";
        this.bottom = "auto";
        // } else if (this.arrowPosition === "bottom") {
        //   this.top = "auto";
        //   这一段暂时还有问题，所以暂时留着：
        //   this.bottom = window.innerHeight - targetPosition + 5 + "px";
        // }

        this.targetText = linkElement.innerText;
        this.wikiName = "";
        this.wikiDescription = "";
        this.wikiImg = "";
        this.isShow = true;

        this.isFadeIn = true;
        setTimeout(() => {
          this.isFadeIn = false;
          resolve();
        }, 300);

        this.$umami.trackEvent("WikiPopups", "show");
      });
    },
    closePopups(isForce = false) {
      return new Promise((resolve) => {
        if (!isForce && (!this.isShow || this.isMouseEnterModule)) return;

        this.isFadeOut = true;
        this.targetText = "";
        setTimeout(
          () => {
            this.isShow = false;
            this.isFadeOut = false;
            resolve();
          },
          isForce ? 0 : 200
        );
      });
    },
    onLeaveModule() {
      if (this.isShow) {
        this.isMouseEnterModule = false;
        this.timerWaitClose = setTimeout(() => {
          if (!this.isMouseEnterModule) {
            this.closePopups();
          }
        }, 350);
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
  font-size: 0.9rem;
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
  width: 0;
  position: absolute;
  left: $arrow-margin-left;

  &.wiki-arrow__top {
    border-bottom-color: #fff;
    top: calc($arrow-height * -2);
  }

  &.wiki-arrow__bottom {
    border-top-color: #fff;
    bottom: calc($arrow-height * -2);
  }
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
  margin: auto;
  margin-bottom: 10px;
  margin-top: -10px;
}
</style>
