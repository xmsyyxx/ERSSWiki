<template>
  <div v-if="data" class="wiki-details">
    <div v-if="infoKeys" class="wiki-details__list">
      <ul>
        <li v-for="key of renderedList" :key="key" class="wiki-details__item">
          <div class="wiki-details__title">
            <span v-for="item of key" :key="item">
              {{ item }}
            </span>
          </div>
          <div class="wiki-details__text">{{ data[key] }}</div>
        </li>
      </ul>
      <div
        v-if="isNeedShowMore"
        class="wiki-details__more"
        @click="toggleShowMore"
      >
        <IconArrowDown v-if="!isShowMore" />
        <IconArrowUp v-else />
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowDown from "./icons/IconArrowDown.vue";
import IconArrowUp from "./icons/IconArrowUp.vue";

export default {
  name: "WikiDetailsList",
  components: {
    IconArrowDown,
    IconArrowUp,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isNeedShowMore: true,
      isShowMore: false,
      renderMaxItem: 5,
    };
  },
  computed: {
    infoKeys() {
      return Object.keys(this.data);
    },
    renderedList() {
      return this.infoKeys.slice(0, this.renderMaxItem);
    },
  },
  mounted() {
    if (this.infoKeys.length < this.renderMaxItem) {
      this.isShowMore = true;
      this.isNeedShowMore = false;
    }
  },
  methods: {
    toggleShowMore() {
      this.isShowMore = !this.isShowMore;
      if (this.isShowMore) {
        this.renderMaxItem = this.infoKeys.length;
        this.$umami.trackEvent("WikiMoreDetails", "show");
      } else {
        this.renderMaxItem = 5;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-details {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  margin-top: -1rem;
}

.wiki-details__list {
  font-size: 1.1rem;
  font-weight: 400;

  ul {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 0;
    list-style: none;
  }
}

.wiki-details__item {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.wiki-details__title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  float: left;
  color: $wiki-subtitle-black;
  word-wrap: break-word;
  max-width: 33.33%; /* 4/12 */
  min-width: 4em;
}

.wiki-details__text {
  margin-left: 0;
  color: $wiki-description-black;
  word-wrap: break-word;
  width: 66.67%; /* 8/12 */
  max-width: 66.67%;
}

.wiki-details__more {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  width: 100%;
}
</style>
