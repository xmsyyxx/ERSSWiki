<template>
  <article class="wiki-item">
    <WikiPcItemInformation
      :title="WikiData.title"
      :description="WikiData.description"
    />
    <WikiTags v-if="WikiData.tags" :tags="WikiData.tags" />
    <section class="wiki-info">
      <section class="wiki-info-left">
        <WikiPcBaseIntroductions
          v-if="WikiData.introduction"
          :data="WikiData.introduction"
        />
        <section class="wiki-article">
          <nuxt-content :document="WikiData" tag="div" />
          <section class="wiki-article-fill"></section>
        </section>
      </section>
      <section v-if="WikiData.img || WikiData.info" class="wiki-info-right">
        <section v-if="WikiData.img" class="wiki-info-picture">
          <WikiPicture :src="WikiData.img" :alt="WikiData.title" />
        </section>
        <WikiPcDetailsList v-if="WikiData.info" :data="WikiData.info" />
        <WikiPcStatus
          v-if="WikiData.createdAt || WikiData.updatedAt"
          :created="WikiData.createdAt"
          :updated="WikiData.updatedAt"
        />
      </section>
    </section>
  </article>
</template>

<script>
import WikiPicture from "../../components/WikiPicture.vue";
import WikiTags from "../../components/WikiTags.vue";
import WikiPcItemInformation from "../../components/pc/WikiPcItemInformation.vue";
import WikiPcDetailsList from "../../components/pc/WikiPcDetailsList.vue";
import WikiPcBaseIntroductions from "../../components/pc/WikiPcBaseIntroductions.vue";
import WikiPcStatus from "../../components/pc/WikiPcStatus.vue";

export default {
  name: "WikiPcItem",
  components: {
    WikiPcDetailsList,
    WikiPcBaseIntroductions,
    WikiPcItemInformation,
    WikiPicture,
    WikiTags,
    WikiPcStatus,
  },
  layout: "WikiPcContents",
  async asyncData({ $content, params }) {
    const WikiData = await $content("wiki", params.item).fetch();
    // console.log(WikiData);
    const { title } = WikiData;
    if (!WikiData.info) {
      WikiData.info = {
        中文名: WikiData.title,
        标签: String(WikiData.tags).replace(/,/g, "，"),
      };
    }
    const metaTitle = title + " [耳斯百科]";
    return {
      WikiData,
      metaTitle,
      slug: params.item,
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
  beforeMount() {
    if (window.outerWidth < 500) {
      return window.location.replace(
        `/wiki/${window.location.pathname.split("/").pop()}`
      );
    }
  },
};
</script>

<style scoped>
.wiki-item {
  display: flex;
  flex-direction: column;
  max-width: 1180px;
  min-width: 960px;
  height: 100%;
  margin: 0 auto;
}

.wiki-article {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.wiki-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.wiki-info-left {
  width: 69%;
}

.wiki-info-right {
  width: 29%;
}
</style>

<style>
.nuxt-content {
  width: 100%;
}

.wiki-info > .wiki-picture {
  width: 30%;
}

.nuxt-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 3.5rem;
  border-bottom: 2px solid #e6e6e6;
  padding-bottom: 1rem;
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

.nuxt-content > .wiki-picture {
  margin-left: 1rem;
  margin-right: 1rem;
}

.nuxt-content hr {
  display: none;
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
</style>