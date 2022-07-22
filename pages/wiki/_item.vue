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
    <section class="wiki-article markdown-body">
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
  async asyncData({ $content, params, redirect }) {
    try {
      const WikiData = await $content("wiki", params.item).fetch();
      // console.log(WikiData);
      const { title } = WikiData;
      const metaTitle = title + " [耳斯百科]";
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
      title: this.metaTitle,
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
    const onresize = () => {
      const path = window.location.pathname.split("/").pop();
      if (window.outerWidth > 500 && path) {
        return window.location.replace(`/item/${path}`);
      }
    };
    onresize();
    window.addEventListener("resize", onresize);
  },
  mounted() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(async function (registrations) {
          for (const registration of registrations) {
            await registration.unregister();
          }
          console.log("ServiceWorker unregistered successfully.");
        });
    }
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
