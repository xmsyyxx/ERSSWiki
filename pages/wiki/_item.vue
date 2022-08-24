<template>
  <div class="wiki-item">
    <WikiItemInformation
      :title="WikiData.title"
      :description="WikiData.description"
    />
    <WikiTags v-if="WikiData.tags" :tags="WikiData.tags" />
    <WikiPicture
      v-if="WikiData.img"
      :src="WikiData.img"
      :title="WikiData.title"
    />
    <WikiBaseIntroductions
      v-if="WikiData.introduction"
      :data="WikiData.introduction"
    />
    <WikiDetailsList v-if="WikiData.info" :data="WikiData.info" />
    <div class="wiki-item__fill"></div>
    <div class="wiki-item__article">
      <nuxt-content :document="WikiData" tag="div" />
    </div>
  </div>
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
  async asyncData({ $content, params, redirect }) {
    try {
      const WikiData = await $content("wiki", params.item).fetch();
      // console.log(WikiData);
      const { title } = WikiData;
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
          media: "only screen and (min-width: 500px)",
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
    /**
     * 电脑端调整
     */
    const onresize = () => {
      // const path = window.location.pathname.split("/").pop();
      const path =
        window.location.pathname.split("/").pop() ||
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 2
        ];
      const isPreFetchBot =
        window.URLSearchParams &&
        !!(
          new window.URLSearchParams(window.location.search).get("bot") === "1"
        );
      if (!isPreFetchBot && path && window.outerWidth > 500) {
        return window.location.replace(`/item/${path}`);
      }
    };
    const onhashchange = () => {
      document.documentElement.scrollTop =
        document.documentElement.scrollTop - 44;
    };
    onresize();
    // onhashchange();
    window.addEventListener("resize", onresize);
    window.addEventListener("hashchange", onhashchange);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-item__article {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.wiki-item__fill {
  width: 100%;
  height: 0.7rem;
  background-color: $wiki-footer-light-gray;
  border: 0;
}
</style>
