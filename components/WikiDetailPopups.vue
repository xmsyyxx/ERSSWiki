<template>
  <div
    v-show="isShow"
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
    <div class="wiki-popups__arrow wiki-arrow__shadow"></div>
    <div class="wiki-popups__arrow wiki-arrow__top"></div>
    <div class="wiki-popups__module">
      <div class="wiki-popups__text">
        <p>
          <span
            v-if="wikiImg"
            class="wiki-popups__img"
            :style="{ 'background-image': 'url(' + wikiImg + ')' }"
          >
          </span>
          <span class="wiki-popups__description">
            <strong v-if="wikiName">{{ wikiName }}：</strong
            >{{ wikiDescription }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import getWikiDescription from "../assets/js/getWikiDescription";
import getWikiPicture from "../assets/js/getWikiPicture";
import { isSupportWebp } from "../assets/js/init";

export default {
  name: "WikiDetailPopups",
  props: {
    target: {
      type: String,
      default: ".wiki-contents__body",
    },
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
      let name = this.targetText;
      name = String(name)
        .replace(/(^\s*)|(\s*$)/g, "") // 去除开头结尾空格
        .replace(/([A-Za-z].*) ([\u4E00-\u9FA5].*)/gi, "$1$2"); // 去除英文后空格
      let WikiData = {};
      try {
        WikiData = await this.$content("wiki", name, { text: true }).fetch();
      } catch {
        WikiData = {};
      }

      const description =
        getWikiDescription(WikiData) || "百科预览信息获取失败";

      this.wikiName = WikiData.title;
      this.wikiDescription = description;
      const wikiImgSuffix =
        "/twitter_card" + (isSupportWebp() ? ".webp" : ".jpg");
      this.wikiImg = getWikiPicture(WikiData)
        ? getWikiPicture(WikiData) + wikiImgSuffix
        : "";
    },
  },
  mounted() {
    this.onMounted();
    const observer = new MutationObserver(this.onMounted);
    const ContentsBody = document.querySelector(this.target);
    const WikiIntroductions = document.querySelector(".wiki-introductions");
    observer.observe(ContentsBody, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    // 兼容
    if (WikiIntroductions) {
      observer.observe(WikiIntroductions, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  },
  methods: {
    onMounted() {
      const disableElements = [
        ":not(.footnote-ref)",
        ":not(.footnotes a)",
        ":not(.footnote-backref)",
        ":not(h2 a)",
        ":not(h3 a)",
        ":not(.wiki-search__list a)",
        ":not(.wiki-no-preview a)",
      ].join("");
      Array.from(
        document.querySelectorAll(`${this.target} a${disableElements}`)
      ).forEach((element) => {
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
        this.top = top + 35 + "px";
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

$wiki-popups-width: 300px;
$wiki-popups-border-color: rgba(204, 204, 204, 0.3);

.wiki-popups {
  display: none;
  position: absolute;
  background: $wiki-common-white;
  line-height: 20px;
  min-width: $wiki-popups-width;
  color: $wiki-description-black;
  border-radius: 2px;
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
    // top: calc($arrow-height * -2);
    top: -18px;
  }

  &.wiki-arrow__shadow {
    border-bottom-color: $wiki-popups-border-color;
    top: -20px;
  }

  // &.wiki-arrow__bottom {
  //   border-top-color: #fff;
  //   bottom: calc($arrow-height * -2);
  // }
}

.wiki-popups__module {
  display: flex;
  background: #fff;
  flex-direction: column;
  align-content: flex-start;
  box-shadow: 0px 2px 5px rgb(0 0 0 / 12%);
  border: 1px solid $wiki-popups-border-color;
}

.wiki-popups__text {
  font-size: 14px;
  padding-top: 0.5rem;
  overflow: hidden;
  padding-bottom: 0;
  margin: 1rem;
  width: $wiki-popups-width;

  p {
    text-indent: 0;
    margin-bottom: 10px;

    .wiki-popups__description {
      min-height: 64px;
      max-height: 126px;
      overflow: hidden;
      display: block;
    }
  }

  &::after {
    content: "";
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      #ffffff 50%
    );
    position: absolute;
    bottom: 26px;
    right: 0;
    width: 25%;
    height: 20px;
    background-color: transparent;
    pointer-events: none;
    border-right: 1px solid $wiki-popups-border-color;
  }
}

.wiki-popups__img {
  display: flex;
  margin: auto;
  margin-bottom: 0.5rem;
  margin-top: -1rem;
  width: $wiki-popups-width;
  height: calc($card-img-height * ($wiki-popups-width / $card-img-width));
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
