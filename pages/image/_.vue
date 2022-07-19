<template>
  <div class="wiki-image-item">
    <div class="wiki-image-header">
      <div class="wiki-image-header-nav">
        <div class="wiki-logo-text">
          <div class="wiki-logo">
            <img
              src="https://wikioss.xhemj.work/static/logo/64x64.png"
            />
          </div>
          <NuxtLink to="/"> 耳斯百科 </NuxtLink>
        </div>
      </div>
    </div>
    <div class="wiki-image-body">
      <div class="wiki-image-description">
        <span class="wiki-image-title">{{ item }}</span>
      </div>
      <img class="wiki-image" :src="imgSrc" />
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiImageItem",
  layout: "WikiImageShow",
  asyncData({ params }) {
    const path = "/" + params.pathMatch;
    const item = params.pathMatch.split("/")[0];
    return {
      path,
      item,
    };
  },
  computed: {
    imgSrc() {
      return (
        "https://wikioss.xhemj.work/static" + this.path + ".png"
      );
    },
  },
};
</script>

<style scoped>
.wiki-image-item {
  color: #b2b2b2;
  background-color: #0a0a0a;
  width: 100%;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.wiki-image-header {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  color: #000;
  line-height: 44px;
  background-color: #333;
  user-select: none;
  z-index: 10;
  width: 100%;
  min-width: 260px;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  border-image: linear-gradient(#edf2f7f2, #edf2f7f2);
}

.wiki-image-header-nav {
  height: 100%;
  display: flex;
  align-content: center;
  flex-direction: row;
}

.wiki-logo-text > a {
  color: #fff;
}

.wiki-logo-text {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 1.5rem;
  width: 100%;
  font-weight: 700;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1rem;
}

.wiki-logo {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.wiki-logo img {
  width: 32px;
}

.wiki-image-body {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  align-content: center;
  height: 100%;
  min-width: 260px;
}

.wiki-image-body img {
  max-width: 100%;
  margin: auto;
  max-height: 620px;
}

.wiki-image-description {
  position: absolute;
  top: 80px;
  text-align: center;
  width: 100%;
  font-size: 1rem;
}
</style>
