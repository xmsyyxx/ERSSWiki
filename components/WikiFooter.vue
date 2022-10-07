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
        <span id="name" class="wiki-footer__homehide">
          <span id="ersswiki">耳斯百科</span>
          <span id="version">开发版 {{ version }}</span>
        </span>
        <!-- <span>最后更新：{{ buildTime }}</span> -->
        <span id="beian">
          互联网ICP备案：<a
            href="https://beian.miit.gov.cn"
            target="_blank"
            rel="noopener noreferrer"
            style="color: #333"
          >
            闽ICP备2022010207号
          </a>
        </span>
        <span id="copyright">{{ copyright }}</span>
        <hr class="wiki-footer__pcshow wiki-footer__homehide" />
        <span class="wiki-footer__pcshow wiki-footer__homehide"
          >此网站为 厦门市音乐学校 <strong>非官方</strong>百科网，
        </span>
        <span class="wiki-footer__pcshow wiki-footer__homehide"
          >如需了解更多学校详情，请点此
          <a
            href="https://xmyyxx.xmedu.cn/"
            target="_blank"
            rel="noopener noreferrer"
            >进入学校官网</a
          >。</span
        >
        <span>
          <strong>开发中页面，不代表最终品质，且不保证访问质量</strong>
        </span>
      </div>
      <div class="wiki-footer__fill wiki-footer__homehide"></div>
      <div class="wiki-footer__tips wiki-footer__homehide">
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
  font-size: 0.75rem;

  span {
    line-height: 1.5;
    font-weight: 400;

    a:hover {
      text-decoration: underline;
    }
  }
}

.wiki-footer__copyright {
  #name {
    border-bottom: solid 1px #c8ccd1;
    padding-bottom: 0.25rem;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }

  #ersswiki {
    font-size: 1.2rem;
    font-weight: 700;
  }
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

.wiki-footer__pcshow {
  display: block;
}

.wiki-footer__home {
  .wiki-footer__homehide {
    display: none;
  }
}

@media only screen and (max-width: 500px) {
  .wiki-footer {
    padding: 0;
    /* font-size: 10px; */
    background: $wiki-common-white;
    // border-top: 0.5rem solid $wiki-footer-light-gray;
    text-align: left;
    position: relative;
    border-top: 1px solid #c8ccd1;
    background-color: #eaecf0;
  }

  .wiki-footer.wiki-footer__home {
    border-top: none;
  }

  .wiki-footer__box {
    padding: 1rem;
    padding-bottom: 3rem;
    max-width: 100%;
    min-width: 0;
    flex-direction: column;
  }

  .wiki-footer__tips {
    display: none;
  }

  .wiki-footer__pcshow {
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
