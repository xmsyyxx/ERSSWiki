<template>
  <div class="wiki-common"></div>
</template>

<script>
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

    function isSupportWebp() {
      try {
        return (
          document
            .createElement("canvas")
            .toDataURL("image/webp", 0.5)
            .indexOf("data:image/webp") === 0
        );
      } catch {
        return !1;
      }
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
