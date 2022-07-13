<template>
  <article class="wiki-item">
    <WikiItemInformation
      :title="WikiData.title"
      :description="WikiData.description"
    />
    <WikiTags v-if="WikiData.tags" :tags="WikiData.tags" />
    <WikiPicture
      v-if="WikiData.img"
      :src="WikiData.img"
      :alt="WikiData.title"
    />
    <WikiBaseIntroductions
      v-if="WikiData.introduction"
      :data="WikiData.introduction"
    />
    <WikiDetailsList v-if="WikiData.info" :data="WikiData.info" />
    <section class="wiki-space-fill"></section>
    <section class="wiki-article">
      <nuxt-content :document="WikiData" tag="div" />
    </section>
  </article>
</template>

<script>
import WikiDetailsList from "../../components/WikiDetailsList";
import WikiBaseIntroductions from "../../components/WikiBaseIntroductions";
import WikiItemInformation from "../../components/WikiItemInformation";
import WikiPicture from "../../components/WikiPicture.vue";
import WikiTags from "../../components/WikiTags.vue";

export default {
  name: "WikiItem",
  components: {
    WikiDetailsList,
    WikiBaseIntroductions,
    WikiItemInformation,
    WikiPicture,
    WikiTags,
  },
  layout: "WikiContents",
  async asyncData({ $content, params }) {
    const WikiData = await $content("wiki", params.item).fetch();
    // console.log(WikiData);
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
        { hid: "og:title", property: "og:title", content: this.WikiData.title },
        {
          hid: "og:description",
          property: "og:description",
          content: this.WikiData.description,
        },
        // Twitter Card
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.WikiData.title,
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
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.wiki-space-fill {
  width: 100%;
  height: 0.7rem;
  background-color: #f5f5f5;
  border: 0;
}
</style>

<style>
.nuxt-content h2 {
  font-weight: 700;
  margin-left: 1rem;
  margin-right: 1rem;
}

.nuxt-content > h2 > a ::before {
  content: "# ";
}

.nuxt-content p {
  font-weight: 400;
  font-size: 1.1rem;
  color: #333;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.nuxt-content img {
  width: 100%;
}

.nuxt-content hr {
  width: 100%;
  height: 0.7rem;
  background-color: #f5f5f5;
  border: 0;
  transform: translateX(-1rem);
}

.footnotes {
  margin-left: 1rem;
  margin-right: 1rem;
}

.footnote-ref {
  font-weight: 500;
}

.footnote-ref::before {
  content: "[";
}

.footnote-ref::after {
  content: "]";
}

.footnotes > hr {
  display: none;
}

.footnotes > ol {
  padding-left: 1rem;
}

.footnotes > ol > li::marker {
  font-weight: 700;
}

.footnote-backref::before {
  content: " ";
}

.footnote-backref {
  display: none;
}

@media only screen and (min-width: 500px) {
  .wiki-item {
    display: flex;
    flex-direction: column;
    max-width: 1180px;
    min-width: 960px;
    height: 100%;
    margin: auto;
  }
}
</style>
