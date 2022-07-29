<template>
  <div class="wiki-footer" :class="{ 'wiki-footer-bottom': !isScroll }">
    <div class="wiki-footer-box">
      <div class="wiki-footer-copyright">
        <span>耳斯百科 - ERSSWIKI</span>
        <span>
          Copyright &copy; 2021-{{ new Date().getFullYear() }} Xhemj & ERSS
          工作室
        </span>
        <hr />
        <span>此网站为 厦门市音乐学校 <strong>非官方</strong>百科网， </span>
        <span
          >如需了解更多学校详情，请点此
          <a
            href="https://xmyyxx.xmedu.cn/"
            target="_blank"
            rel="noopener noreferrer"
            >进入学校官网</a
          >。</span
        >
      </div>
      <div class="wiki-footer-space-fill"></div>
      <div class="wiki-footer-tips">
        <span class="wiki-footer-logo">
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
  data() {
    return {
      isScroll: false,
    };
  },
  mounted() {
    // 如果有滚动条
    // 则将 footer 放置于滚到底部的底部
    if (
      document.querySelector(".wiki-body").offsetHeight +
        document.querySelector(".wiki-footer").offsetHeight >
      window.innerHeight
    ) {
      this.isScroll = true;
    }
  },
};
</script>

<style scoped>
.wiki-footer {
  background-color: var(--wiki-footer-gray);
  font-weight: 400;
  /* user-select: none; */
  z-index: -100;
  padding: 0 50px;
  font-size: 0.8rem;
}

.wiki-footer.wiki-footer-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.wiki-footer-box {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  color: var(--wiki-content-black);
  padding: 40px 0;
  width: 100%;
  max-width: var(--wiki-max-width);
  min-width: var(--wiki-min-width);
  margin: auto;
}

.wiki-footer-copyright {
  display: flex;
  flex-direction: column;
  line-height: 2;
}

.wiki-footer-tips {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media only screen and (max-width: 500px) {
  .wiki-footer {
    padding: 0 1rem;
  }

  .wiki-footer-box {
    max-width: 100%;
    min-width: 0;
    flex-direction: column;
  }

  .wiki-footer-tips {
    display: none;
  }
}
</style>
