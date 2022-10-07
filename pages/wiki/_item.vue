<template>
  <div class="wiki-item">
    <WikiItemInformation
      :title="WikiData.title"
      :description="WikiData.description"
    />
    <WikiTags v-if="WikiData.tags" :tags="WikiData.tags" />
    <WikiPicture
      v-if="wikiImg.url"
      :src="wikiImg.url"
      :title="wikiImg.title || WikiData.title"
      normalSuffix="/twitter_card"
      thumbSuffix="/twitter_card_thumb"
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
    <WikiLastModified :lastModified="WikiData.updatedAt" />
  </div>
</template>

<script>
import WikiDetailsList from "../../components/WikiDetailsList.vue";
import WikiBaseIntroductions from "../../components/WikiBaseIntroductions.vue";
import WikiItemInformation from "../../components/WikiItemInformation.vue";
import WikiPicture from "../../components/WikiPicture.vue";
import WikiTags from "../../components/WikiTags.vue";
import wikiCommonHead from "../../assets/js/wikiCommonHead";
import WikiLastModified from "../../components/WikiLastModified.vue";

export default {
  name: "WikiItem",
  components: {
    WikiDetailsList,
    WikiBaseIntroductions,
    WikiItemInformation,
    WikiPicture,
    WikiTags,
    WikiLastModified,
  },
  layout: "WikiContents",
  async asyncData({ $content, params, redirect }) {
    try {
      const WikiData = await $content("wiki", params.item, {
        text: true,
      }).fetch();
      // console.log(WikiData);
      return {
        WikiData,
        slug: params.item,
      };
    } catch {
      return redirect(`/404?name=${params.item}`);
    }
  },
  head() {
    return wikiCommonHead(this);
  },
  computed: {
    wikiImg() {
      if (typeof this.WikiData.img === "string") {
        return {
          url: this.WikiData.img,
          title: null,
        };
      } else {
        return {
          url: this.WikiData.img?.url,
          title: this.WikiData.img?.title,
        };
      }
    },
  },
  mounted() {
    const onhashchange = () => {
      document.documentElement.scrollTop =
        document.documentElement.scrollTop - 44;
    };
    window.addEventListener("hashchange", onhashchange);
    if (this.WikiData.css) {
      document.querySelector(".wiki-contents") &&
        document
          .querySelector(".wiki-contents")
          .setAttribute("data-item", this.WikiData.title);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-item__article {
  display: flex;
  flex-direction: column;
  padding-bottom: 3rem;
  min-height: 45vh;
}

.wiki-item__fill {
  width: 100%;
  height: 0.4rem;
  background-color: $wiki-footer-light-gray;
  border: 0;
  margin-top: 0.5rem;
}
</style>
