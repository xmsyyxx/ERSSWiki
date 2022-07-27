<template>
  <div class="wiki-logo">
    <div class="wiki-logo-box">
      <img
        class="wiki-logo-image"
        src="https://wikioss.xhemj.work/static/logo/64x64.png"
      />
      <span class="wiki-logo-text">耳斯百科</span>
      <div class="wiki-development-tips">开发版</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiLogo",
};
</script>

<style scoped>
.wiki-logo-box {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  font-size: 40px;
  user-select: none;
}

.wiki-logo-image {
  width: 64px;
  height: 64px;
}

.wiki-development-tips {
  font-size: 16px;
  float: right;
}

.wiki-logo-text {
  font-size: 40px;
}
</style>
