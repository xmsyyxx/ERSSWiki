<template>
  <div class="wiki-image__item">
    <div class="wiki-image__header">
      <div class="wiki-image__header--nav">
        <div class="wiki-image__logo">
          <div class="wiki-image__logo--main">
            <img src="https://wikioss.xhemj.work/static/logo/64x64.png" />
          </div>
          <NuxtLink to="/"> 耳斯百科 </NuxtLink>
        </div>
      </div>
    </div>
    <div class="wiki-image__body">
      <div class="wiki-image__description">
        <span class="wiki-image__title">{{ item }}</span>
      </div>
      <picture class="wiki-image__picture">
        <source type="image/webp" :srcset="imgSrc + '/big_webp'" />
        <img :src="imgSrc + '/big'" />
      </picture>
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
  head() {
    return {
      title: this.item + " - 耳斯百科",
    };
  },
  computed: {
    imgSrc() {
      return "https://wikioss.xhemj.work/static" + this.path + ".png";
    },
  },
  mounted() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(async function (registrations) {
          for (const registration of registrations) {
            await registration.unregister();
          }
        });
    }
  },
};
</script>

<style scoped>
.wiki-image__item {
  color: var(--wiki-description-gray);
  background-color: var(--wiki-image-black);
  width: 100%;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.wiki-image__header {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  color: var(--wiki-content-black);
  line-height: 44px;
  background-color: var(--wiki-content-black);
  user-select: none;
  z-index: 10;
  width: 100%;
  min-width: 260px;
  border-bottom: 1px solid var(--wiki-border-gray);
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  border-image: linear-gradient(
    var(--wiki-header-light-gray),
    var(--wiki-header-light-gray)
  );
}

.wiki-image__header--nav {
  height: 100%;
  display: flex;
  align-content: center;
  flex-direction: row;
}

.wiki-image__logo > a {
  color: var(--wiki-common-white);
}

.wiki-image__logo {
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

.wiki-image__logo--main {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.wiki-image__logo--main img {
  width: 32px;
}

.wiki-image__body {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  align-content: center;
  height: 100%;
  min-width: 260px;
}

.wiki-image__picture,
.wiki-image__picture > source,
.wiki-image__picture > img {
  max-width: 100%;
  margin: auto;
  max-height: 620px;
}

.wiki-image__description {
  position: absolute;
  top: 80px;
  text-align: center;
  width: 100%;
  font-size: 1rem;
}
</style>
