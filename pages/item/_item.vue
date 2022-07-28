<template>
  <article class="wiki-item">
    <WikiPcItemInformation
      :title="WikiData && WikiData.title"
      :description="WikiData && WikiData.description"
    />
    <WikiTags
      v-if="WikiData && WikiData.tags"
      :tags="WikiData && WikiData.tags"
    />
    <section class="wiki-main">
      <section class="wiki-main-left">
        <WikiPcBaseIntroductions
          v-if="WikiData && WikiData.introduction"
          :data="WikiData && WikiData.introduction"
        />
        <section class="wiki-article markdown-body">
          <nuxt-content :document="WikiData" tag="div" />
          <section class="wiki-article-fill"></section>
        </section>
      </section>
      <section
        v-if="(WikiData && WikiData.img) || WikiData.info"
        class="wiki-main-right"
      >
        <section v-if="WikiData && WikiData.img" class="wiki-main-picture">
          <WikiPicture
            :src="WikiData && WikiData.img"
            :title="WikiData && WikiData.title"
          />
        </section>
        <section class="wiki-sticky">
          <WikiPcDetailsList
            v-if="WikiData && WikiData.info"
            :data="WikiData && WikiData.info"
          />
          <WikiPcStatus
            v-if="(WikiData && WikiData.createdAt) || WikiData.updatedAt"
            :created="WikiData && WikiData.createdAt"
            :updated="WikiData && WikiData.updatedAt"
          />
        </section>
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
  async asyncData({ $content, params, redirect }) {
    try {
      const WikiData = await $content("wiki", params.item).fetch();
      // console.log(WikiData.body);
      const { title } = WikiData;
      if (!WikiData.info) {
        WikiData.info = {
          中文名: WikiData.title,
          标签: String(WikiData.tags).replace(/,/g, "，"),
        };
      }
      const metaTitle = title + " - 耳斯百科";
      return {
        WikiData,
        metaTitle,
        slug: params.item,
      };
    } catch {
      return redirect(`/404?name=${params.item}`);
    }
  },
  head() {
    return {
      title: this.metaTitle || "",
      link: [
        {
          rel: "canonical",
          href: `https://baike.xmsyyxx.com/item/${this.slug}`,
        },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: (this.WikiData && this.WikiData.description) || "",
        },
        // Open Graph
        {
          hid: "og:title",
          property: "og:title",
          content: (this.WikiData && this.WikiData.title) || "",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: (this.WikiData && this.WikiData.description) || "",
        },
        // Twitter Card
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: (this.WikiData && this.WikiData.title) || "",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: (this.WikiData && this.WikiData.description) || "",
        },
      ],
    };
  },
  beforeMount() {
    const onresize = () => {
      const path = window.location.pathname.split("/").pop();
      if (window.outerWidth < 500 && path) {
        return window.location.replace(`/wiki/${path}`);
      }
    };
    onresize();
    window.addEventListener("resize", onresize);
  },
};
</script>

<style scoped>
.wiki-item {
  display: flex;
  flex-direction: column;
  max-width: var(--wiki-max-width);
  min-width: var(--wiki-min-width);
  height: 100%;
  margin: 0 auto;
}

.wiki-article {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.wiki-main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.wiki-main-left {
  width: 69%;
}

.wiki-main-right {
  width: 29%;
  transform: translateY(-2rem);
}

.wiki-sticky {
  position: sticky;
  top: calc(3rem + 60px);
}
</style>
