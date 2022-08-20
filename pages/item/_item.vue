<template>
  <div class="wiki-item">
    <WikiPcItemInformation
      :title="WikiData.title"
      :description="WikiData.description"
    />
    <WikiTags v-if="WikiData.tags" :tags="WikiData.tags" />
    <div class="wiki-main">
      <div class="wiki-main__left">
        <WikiPcBaseIntroductions
          v-if="WikiData.introduction"
          :data="WikiData.introduction"
        />
        <div class="wiki-main__article">
          <nuxt-content :document="WikiData" tag="div" />
          <div class="wiki-main__article--fill"></div>
        </div>
      </div>
      <div v-if="WikiData.img || WikiData.info" class="wiki-main__right">
        <div v-if="WikiData.img" class="wiki-main__picture">
          <WikiPicture :src="WikiData.img" :title="WikiData.title" />
        </div>
        <div class="wiki-main__sticky">
          <WikiPcDetailsList v-if="WikiData.info" :data="WikiData.info" />
          <WikiPcStatus
            v-if="WikiData.createdAt || WikiData.updatedAt"
            :created="WikiData.createdAt"
            :updated="WikiData.updatedAt"
          />
        </div>
      </div>
    </div>
  </div>
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
        {
          rel: "alternate",
          media: "only screen and (max-width: 500px)",
          href: `https://baike.xmsyyxx.com/wiki/${this.slug}`,
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
      // const path = window.location.pathname.split("/").pop();
      const path =
        window.location.pathname.split("/").pop() ||
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 2
        ];
      if (window.outerWidth < 500 && path) {
        return window.location.replace(`/wiki/${path}`);
      }
    };
    const onhashchange = () => {
      document.documentElement.scrollTop =
        document.documentElement.scrollTop - 60;
    };
    onresize();
    // onhashchange();
    window.addEventListener("resize", onresize);
    window.addEventListener("hashchange", onhashchange);
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

.wiki-main__article {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.wiki-main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.wiki-main__left {
  width: 69%;
}

.wiki-main__right {
  width: 29%;
  transform: translateY(-2rem);
}

.wiki-main__sticky {
  position: sticky;
  top: calc(3rem + 60px);
}
</style>
