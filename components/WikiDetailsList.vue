<template>
  <div v-if="data" class="wiki-details">
    <div v-if="infoKeys" class="wiki-details__list">
      <ul>
        <li v-for="key of infoKeys" :key="key" class="wiki-details__item">
          <div class="wiki-details__title">
            <span
              v-for="item of key"
              :key="item"
              class="wiki-details__title--item"
            >
              {{ item }}
            </span>
          </div>
          <div class="wiki-details__text">{{ data[key] }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiDetailsList",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    infoKeys() {
      return Object.keys(this.data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-details {
  display: flex;
  flex-direction: column;
  margin-top: -1rem;
}

.wiki-details__list {
  font-size: 1.1rem;
  font-weight: 400;

  ul {
    display: flex;
    flex-direction: column;
    margin: 1rem;
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
</style>
