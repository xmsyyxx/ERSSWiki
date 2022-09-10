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
import wikiCommonHead from "../../assets/js/wikiCommonHead";

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
  beforeMount() {
    const onhashchange = () => {
      document.documentElement.scrollTop =
        document.documentElement.scrollTop - 44;
    };
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
