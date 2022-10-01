<template>
  <div class="wiki-error">
    <div class="wiki-error__logo">
      <WikiLogo />
    </div>
    <div class="wiki-error__tips">哦不！我们遇到了点问题……</div>
    <NuxtLink to="/" class="wiki-error__back">返回首页</NuxtLink>
    <div class="wiki-error__details">
      <span>如果你感兴趣，以下是错误信息：</span>
      <span>错误代码：{{ error.statusCode || -1 }}</span>
      <span>错误信息：{{ error.message || "无" }}</span>
      <span>页面地址：{{ location.href }}</span>
      <code>{{ userAgent }}</code>
    </div>
  </div>
</template>

<script>
import WikiLogo from "../components/WikiLogo.vue";

export default {
  name: "WikiError",
  components: {
    WikiLogo,
  },
  layout: "WikiHome",
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      location: {},
      userAgent: "",
    };
  },
  mounted() {
    this.location = window.location;
    this.userAgent = window.navigator.userAgent;
  },
};
</script>

<style lang="scss" scoped>
.wiki-error {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  flex-direction: column;
}

.wiki-error__tips {
  margin-top: 10px;
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 1rem;
}

.wiki-error__back {
  font-weight: 700;
  font-size: 1rem;
}

.wiki-error__details {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  font-size: 15px;
}
</style>
