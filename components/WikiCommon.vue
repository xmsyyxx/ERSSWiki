<template>
  <div class="wiki-common"></div>
</template>

<script>
export default {
  name: "WikiCommon",
  mounted() {
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register(
            this.window.location.origin +
              "/sw@v3.js?t=" +
              randomNumber(100000, new Date().getTime())
          )
          .then(function () {
            console.log("ServiceWorker registration successful");
          })
          .catch(function (err) {
            console.log("ServiceWorker registration failed: ", err);
          });
      });
    }
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker
    //     .getRegistrations()
    //     .then(async function (registrations) {
    //       for (const registration of registrations) {
    //         await registration.unregister();
    //       }
    //     });
    // }
  },
};
</script>

<style scoped>
.wiki-common {
  display: none;
}
</style>
