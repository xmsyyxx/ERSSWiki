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
import wikiCommonHead from "../../assets/js/wikiCommonHead";

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
      const WikiData = await $content("wiki", params.item, {
        text: true,
      }).fetch();
      // console.log(WikiData.body);
      if (!WikiData.info) {
        WikiData.info = {
          中文名: WikiData.title,
          标签: String(WikiData.tags).replace(/,/g, "，"),
        };
      }
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
        document.documentElement.scrollTop - 60;
    };
    onresize();
    window.addEventListener("hashchange", onhashchange);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-item {
  display: flex;
  flex-direction: column;
  max-width: $wiki-max-width;
  min-width: $wiki-min-width;
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
