<template>
  <div
    v-if="isStartScroll"
    class="wiki-backtop"
    :class="{
      'wiki-backtop__fadein': isFadeIn,
      'wiki-backtop__fadeout': isFadeOut,
    }"
    @click="onClick"
  >
    <IconBackTop />
  </div>
</template>

<script>
import IconBackTop from "./icons/IconBackTop.vue";

export default {
  name: "WikiBackTop",
  components: {
    IconBackTop,
  },
  data() {
    return {
      isStartScroll: false,
      isFadeIn: false,
      isFadeOut: false,
    };
  },
  mounted() {
    window.document.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        if (this.isStartScroll) return;
        this.isStartScroll = true;
        this.isFadeIn = true;
        setTimeout(() => {
          this.isFadeIn = false;
        }, 300);
      } else {
        if (!this.isStartScroll) return;
        this.isFadeOut = true;
        setTimeout(() => {
          this.isStartScroll = false;
          this.isFadeOut = false;
        }, 300);
      }
    });
  },
  methods: {
    onClick() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wiki-backtop {
  border: 1px solid rgb(221, 221, 221);
  text-align: center;
  position: fixed;
  z-index: 999999;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 7px 0px;
  color: rgb(0, 0, 0);
  font-size: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 50%;
  bottom: 3rem;
  right: 0.5rem;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.wiki-backtop__fadein {
  animation: fadein 0.5s;
}

.wiki-backtop__fadeout {
  animation: fadeout 0.5s;
}
</style>
