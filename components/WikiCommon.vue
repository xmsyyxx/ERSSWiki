<template>
  <div class="wiki-common"></div>
</template>

<script>
import { isSupportWebp } from "../assets/js/init";
export default {
  name: "WikiCommon",
  mounted() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(async function (registrations) {
          for (const registration of registrations) {
            await registration.unregister();
          }
        });
    }

    const body = document.querySelector(".wiki-contents");
    if (body) {
      isSupportWebp()
        ? body.classList.add("webp")
        : body.classList.add("no-webp");
    }
  },
};
</script>

<style lang="scss" scoped>
.wiki-common {
  display: none;
}
</style>
