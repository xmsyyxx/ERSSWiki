<template>
  <div class="wiki-information">
    <div class="wiki-information__left">
      <div class="wiki-information__title">{{ title }}</div>
      <div class="wiki-information__description">
        {{ description }}
      </div>
    </div>
    <div class="wiki-information__right">
      <div class="wiki-information__print wiki-action" @click="print">
        <IconPrinter />
        <span>打印</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconPrinter from "./icons/IconPrinter.vue";

export default {
  name: "WikiItemInformation",
  components: {
    IconPrinter,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  methods: {
    async print() {
      const body = document.body;
      body.classList.add("wiki-printing");
      await window.print();
      body.classList.remove("wiki-printing");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-information {
  display: flex;
  flex-direction: row;
  margin: 1rem;
  justify-content: space-between;
  width: auto;
}

.wiki-information__title {
  color: $wiki-title-black;
  font-size: 1.7rem;
  font-weight: 700;
}

.wiki-information__description {
  color: $wiki-description-black;
  font-size: 0.8rem;
  font-weight: 400;
}

.wiki-information__right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 1rem;
  margin-right: 1.5rem;
}

.wiki-information__print {
  cursor: pointer;
  user-select: none;
  display: none;
}

@media only screen and (min-width: 500px) {
  .wiki-information {
    margin-top: 2rem;
    width: $wiki-left-space;
  }

  .wiki-information__title {
    font-size: 2.5rem;
  }

  .wiki-information__description {
    font-size: 1rem;
  }

  .wiki-information__print {
    display: block;
  }
}
</style>
