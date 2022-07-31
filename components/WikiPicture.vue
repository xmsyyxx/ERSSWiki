<template>
  <div class="wiki-picture">
    <div class="wiki-picture-fill"></div>

    <div class="wiki-picrute-box">
      <a
        :href="'/image/' + src.split('/static/')[1].split('.')[0]"
        target="_blank"
      >
        <picture class="wiki-picture-img wiki--click--WikiPicture">
          <source type="image/webp" :srcset="src + '/thumb_webp'" />
          <img :src="src + '/thumb'" :alt="title" :title="title" />
        </picture>
      </a>
      <label v-if="title" class="wiki-picture-description">
        <span class="wiki-picture-alt">
          <span class="wiki-picture-icon"><IconUp /></span>
          {{ title }}
        </span>
        <div class="wiki-picture-tips">（点击可查看大图）</div>
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
}

.wiki-picture-img,
.wiki-picture-img > source,
.wiki-picture-img > img {
  width: 100%;
  cursor: pointer;
}

.wiki-picture-description {
  color: var(--wiki-description-gray);
  font-size: 0.8rem;
}

.wiki-picture-icon {
  font-size: 1rem;
}

.wiki-picture-tips {
  font-size: 0.5rem;
}

@media only screen and (min-width: 500px) {
  .nuxt-content > .wiki-picture {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    margin-bottom: -2rem;
  }

  .nuxt-content > .wiki-picture > .wiki-picrute-box {
    width: 40%;
    max-height: 300px;
  }

  .nuxt-content > .wiki-picture > .wiki-picture-fill {
    width: 70%;
  }

  .wiki-picture-img {
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
