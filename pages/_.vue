<template>
  <div class="wiki-error">
    <div class="wiki-error__logo">
      <WikiLogo />
    </div>
    <div class="wiki-error__tips">页面找不到啦~~</div>
    <NuxtLink to="/" class="wiki-error__back">返回首页</NuxtLink>
  </div>
</template>

<script>
import WikiLogo from "../components/WikiLogo.vue";

export default {
  name: "WikiError",
  components: {
    WikiLogo,
  },
  layout: "WikiHome",
  async asyncData({ $content, redirect, query }) {
    const WikiData = await $content("wiki").only(["slug", "alias"]).fetch();
    const title = "/" + query.name;

    if (title) {
      for (const item of WikiData) {
        const { slug, alias } = item;
        if (!alias) continue;
        for (const aliasItem of alias) {
          if (aliasItem === title) {
            return redirect("/item/" + slug);
          }
        }
      }
    }
  },
};
</script>

<style scoped>
.wiki-error {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  flex-direction: column;
  user-select: none;
}

.wiki-error__tips {
  margin-top: 10px;
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 1rem;
}

.wiki-error__back {
  font-weight: 700;
  font-size: 1rem;
}
</style>
