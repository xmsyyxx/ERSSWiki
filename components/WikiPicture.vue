<template>
  <div class="wiki-picture">
    <div class="wiki-picture__fill"></div>

    <div class="wiki-picture__box">
      <a
        :href="'/image/' + src.split('/static/')[1].split('.')[0]"
        target="_blank"
      >
        <picture class="wiki-picture__img wiki--click--WikiPicture">
          <source type="image/webp" :srcset="src + '/thumb_webp'" />
          <img :src="src + '/thumb'" :alt="title" :title="title" />
        </picture>
      </a>
      <label v-if="title" class="wiki-picture__description">
        <span class="wiki-picture__tips">
          <span class="wiki-picture__tips--icon"><IconUp /></span>
          {{ title }}
        </span>
        <div class="wiki-picture__tips--item">（点击可查看大图）</div>
      </label>
    </div>
  </div>
</template>

<script>
import IconUp from "./icons/IconUp.vue";

export default {
  name: "WikiPicture",
  components: {
    IconUp,
  },
  props: {
    src: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.wiki-picture {
  display: flex;
  flex-direction: column;
  text-align: center;
  image-rendering: pixelated;
}

.wiki-picture__img,
.wiki-picture__img > source,
.wiki-picture__img > img {
  width: 100%;
  cursor: pointer;
}

.wiki-picture__description {
  color: var(--wiki-description-gray);
  font-size: 0.8rem;
}

.wiki-picture__tips--icon {
  font-size: 1rem;
}

.wiki-picture__tips--item {
  font-size: 0.5rem;
}

@media only screen and (min-width: 500px) {
  .nuxt-content > .wiki-picture {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    margin-bottom: -2rem;
  }

  .nuxt-content > .wiki-picture > .wiki-picture__box {
    width: 40%;
    max-height: 300px;
  }

  .nuxt-content > .wiki-picture > .wiki-picture__fill {
    width: 70%;
  }

  .wiki-picture__img {
    width: 100%;
  }
}
</style>

<style>
.nuxt-content > .wiki-picture {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
