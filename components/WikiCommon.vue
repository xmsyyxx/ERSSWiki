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
  },
};
</script>

<style lang="scss" scoped>
.wiki-common {
  display: none;
}
</style>
