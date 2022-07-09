<template>
  <div class="wiki-item">
    <WikiItemInformation
      :title="WikiData.title"
      :description="WikiData.description"
    />
    <WikiPicture
      v-if="WikiData.img"
      :src="WikiData.img"
      :name="WikiData.title"
    />
    <WikiBaseIntroductions
      v-if="WikiData.introduction"
      :data="WikiData.introduction"
    />
    <WikiDetailsList v-if="WikiData.info" :data="WikiData.info" />
    <div class="wiki-space-fill"></div>
    <article class="wiki-article">
      <nuxt-content :document="WikiData" tag="div" />
    </article>
  </div>
</template>

<script>
import WikiDetailsList from "../../components/WikiDetailsList";
import WikiBaseIntroductions from "../../components/WikiBaseIntroductions";
import WikiItemInformation from "../../components/WikiItemInformation";
import WikiPicture from "../../components/WikiPicture.vue";

export default {
  name: "WikiItem",
  components: {
    WikiDetailsList,
    WikiBaseIntroductions,
    WikiItemInformation,
    WikiPicture,
  },
  layout: "WikiContents",
  async asyncData({ $content, params }) {
    const WikiData = await $content("wiki", params.item).fetch();
    const { title } = WikiData;
    const metaTitle = title + " [耳斯百科]";
    return {
      WikiData,
      metaTitle,
    };
  },
  head() {
    return {
      title: this.metaTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.WikiData.description,
        },
        // Open Graph
        { hid: "og:title", property: "og:title", content: this.metaTitle },
        {
          hid: "og:description",
          property: "og:description",
          content: this.WikiData.description,
        },
        // Twitter Card
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.metaTitle,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.WikiData.description,
        },
      ],
    };
  },
};
</script>

<style scoped>
.wiki-article {
  margin: 1rem;
  margin-bottom: 2rem;
}

.wiki-space-fill {
  width: 100vw;
  height: 0.7rem;
  background-color: #f5f5f5;
  border: 0;
}
</style>

<style>
.nuxt-content h1 {
  font-weight: 700;
}

.nuxt-content > h1 > a ::before {
  content: "# ";
}

.nuxt-content p {
  font-weight: 200;
  font-size: 1.1rem;
  color: #333;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.nuxt-content img {
  width: 100%;
}

.nuxt-content hr,
.place-hr {
  width: 100vw;
  height: 0.7rem;
  background-color: #f5f5f5;
  border: 0;
  transform: translateX(-1rem);
}
</style>
