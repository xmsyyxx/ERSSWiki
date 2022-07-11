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
    console.log(WikiData);
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
.nuxt-content h2 {
  font-weight: 700;
}

.nuxt-content > h2 > a ::before {
  content: "# ";
}

.nuxt-content p {
  font-weight: 400;
  font-size: 1.1rem;
  color: #333;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
</style>
