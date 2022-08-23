<template>
  <div class="wiki-logo">
    <div class="wiki-logo__box">
      <picture class="wiki-logo__image">
        <source
          type="image/webp"
          srcset="
            https://wikioss.xhemj.work/static/logo/v3/512x512.png/normal.webp
          "
        />
        <img src="https://wikioss.xhemj.work/static/logo/v3/512x512.png" />
      </picture>
    </div>
    <span class="wiki-logo__text">耳斯百科</span>
    <div class="wiki-logo__tips">开发版</div>
  </div>
</template>

<script>
export default {
  name: "WikiLogo",
};
</script>

<style scoped>
.wiki-logo__box {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  font-size: 30px;
  user-select: none;
}

.wiki-logo__image img {
  width: 8rem;
  height: auto;
}

.wiki-logo__text {
  font-size: 2rem;
}

@media only screen and (min-width: 500px) {
  .wiki-logo__image img {
    width: 160px;
    min-width: 8rem;
    height: auto;
  }

  .wiki-logo__text {
    font-size: 2.5rem;
  }
}

.wiki-logo__tips {
  font-size: 0.5rem;
  float: right;
}
</style>
