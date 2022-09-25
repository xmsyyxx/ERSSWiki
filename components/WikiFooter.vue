<template>
  <div
    class="wiki-footer"
    :class="{
      'wiki-footer__scroll': isScroll,
      'wiki-footer__home': isHome,
      'wiki-footer__mounted': isMounted,
    }"
  >
    <div class="wiki-footer__box">
      <div class="wiki-footer__copyright">
        <span>耳斯百科 v{{ version }}</span>
        <span>最后更新：{{ buildTime }}</span>
        <span>{{ copyright }}</span>
        <strong>开发中页面，不代表最终品质，且不保证访问质量</strong>
        <hr v-if="!isHome" />
        <span v-if="!isHome"
          >此网站为 厦门市音乐学校 <strong>非官方</strong>百科网，
        </span>
        <span v-if="!isHome"
          >如需了解更多学校详情，请点此
          <a
            href="https://xmyyxx.xmedu.cn/"
            target="_blank"
            rel="noopener noreferrer"
            >进入学校官网</a
          >。</span
        >
      </div>
      <div v-if="!isHome" class="wiki-footer__fill"></div>
      <div v-if="!isHome" class="wiki-footer__tips">
        <span class="wiki-footer__logo">
          <WikiLogo />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import WikiLogo from "./WikiLogo.vue";

export default {
  name: "WikiFooter",
  components: {
    WikiLogo,
  },
  props: {
    isHome: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isScroll: false,
      isMounted: false, // 预渲染时检测到此表示已经渲染完组件
      version: require("~/package.json").version,
      buildTime: require("~/assets/build.json").time,
      copyright: `Copyright © 2021-${new Date().getFullYear()} IYAMAYA 耳斯工作室`,
    };
  },
  mounted() {
    if (!this.isHome) {
      // 如果有滚动条
      // 则将 footer 放置于滚到底部的底部
      this.handleScrollBar();
      const observer = new MutationObserver(this.handleScrollBar);
      observer.observe(document.querySelector(".wiki-contents__body"), {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  },
  methods: {
    handleScrollBar() {
      if (
        document.querySelector(".wiki-contents__body").offsetHeight +
          document.querySelector(".wiki-footer").offsetHeight >
        window.innerHeight
      ) {
        this.isScroll = true;
      }
      this.isMounted = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: $wiki-footer-gray;
  font-weight: 400;
  z-index: 10;
  padding: 0 50px;
  font-size: 0.8rem;
}

.wiki-footer.wiki-footer__scroll {
  position: relative;
}

.wiki-footer__box {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  color: $wiki-content-black;
  padding: 20px 0;
  width: 100%;
  max-width: $wiki-max-width;
  min-width: $wiki-min-width;
  margin: auto;
}

.wiki-footer__copyright {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  margin: auto 0;
}

.wiki-footer__tips {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media only screen and (max-width: 500px) {
  .wiki-footer {
    padding: 0 1rem;
    /* font-size: 10px; */
    background: $wiki-common-white;
    border-top: 0.7rem solid $wiki-footer-light-gray;
    text-align: center;
  }

  .wiki-footer.wiki-footer__home {
    border-top: none;
  }

  .wiki-footer__box {
    padding: 1rem;
    max-width: 100%;
    min-width: 0;
    flex-direction: column;
  }

  .wiki-footer__tips {
    display: none;
  }
}
</style>

<style lang="scss">
@media only screen and (min-width: 500px) {
  .wiki-footer__logo {
    .wiki-logo__text,
    .wiki-logo__tips {
      display: none;
    }
  }
}
</style>
