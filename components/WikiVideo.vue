<template>
  <div class="wiki-video">
    <iframe
      :src="videoSrc"
      class="wiki-video__iframe"
      allowfullscreen="true"
      msallowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      oallowfullscreen="true"
      allowtransparency="true"
      scrolling="no"
      width="100%"
      height="200px"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      referrerPolicy="unsafe-url"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "WikiVideo",
  props: {
    vcode: {
      type: String,
      required: true,
    },
  },
  computed: {
    videoSrc() {
      return (
        "https://player.dogecloud.com/web/player.html?vcode=" +
        this.vcode +
        "&userId=1943&autoPlay=false&inFrame=true&vtype=10"
      );
    },
  },
};
</script>

<style scoped>
.wiki-video {
  text-align: center;
}

.wiki-video__iframe {
  width: 100%;
}

@media only screen and (min-width: 500px) {
  .wiki-video__iframe {
    width: auto;
    height: auto;
    min-width: calc(var(--wiki-min-width) * 0.69);
    min-height: 350px;
    padding: 0.5rem;
  }
}
</style>
