<template>
  <div class="wiki-item">
    <WikiItemInformation
      :title="WikiData.title"
      :description="WikiData.description"
    />
    <WikiTags v-if="WikiData.tags" :tags="WikiData.tags" />
    <div class="wiki-main">
      <div class="wiki-main__left">
        <WikiBaseIntroductions
          v-if="WikiData.introduction"
          :data="WikiData.introduction"
        />
        <div class="wiki-main__article">
          <nuxt-content :document="WikiData" tag="div" />
          <div class="wiki-main__article--fill"></div>
        </div>
      </div>
      <div v-if="WikiData.img || WikiData.info" class="wiki-main__right">
        <div v-if="wikiImg.url" class="wiki-main__picture">
          <WikiPicture
            :src="wikiImg.url"
            :title="wikiImg.title || WikiData.title"
            normalSuffix="/twitter_card"
            thumbSuffix="/twitter_card_thumb"
          />
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
import WikiPcDetailsList from "../../components/pc/WikiPcDetailsList.vue";
import WikiPcStatus from "../../components/pc/WikiPcStatus.vue";
import wikiCommonHead from "../../assets/js/wikiCommonHead";
import WikiBaseIntroductions from "../../components/WikiBaseIntroductions.vue";
import WikiItemInformation from "../../components/WikiItemInformation.vue";

export default {
  name: "WikiPcItem",
  components: {
    WikiPcDetailsList,
    WikiBaseIntroductions,
    WikiItemInformation,
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
        document.documentElement.scrollTop - 60;
    };
    onresize();
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
  width: $wiki-left-space;
}

.wiki-main__right {
  width: $wiki-right-space;
  transform: translateY(-2rem);
}

.wiki-main__sticky {
  position: sticky;
  top: calc(3rem + 60px);
}
</style>
