<template>
  <section v-if="data" class="wiki-details">
    <div v-if="infoKeys" class="wiki-detail-list">
      <ul>
        <li v-for="key of infoKeys" :key="key" class="wiki-detail-item">
          <div class="wiki-detail-title">
            <span
              v-for="item of key.split('')"
              :key="item"
              class="wiki-detail-title-item"
              >{{ item }}</span
            >
          </div>
          <div class="wiki-detail-text">{{ data[key] }}</div>
        </li>
      </ul>
    </div>
  </section>
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
      const o = [];
      for (const key in this.data) {
        o.push(key);
      }
      return o;
    },
  },
};
</script>

<style scoped>
.wiki-details {
  display: flex;
  flex-direction: column;
  margin-top: -2rem;
}

.wiki-detail-list {
  font-size: 1.1rem;
  font-weight: 400;
}

.wiki-detail-list ul {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 0;
  list-style: none;
}

.wiki-detail-item {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.wiki-detail-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  float: left;
  color: #444;
  word-wrap: break-word;
  width: 33.33%; /* 4/12 */
  max-width: 33.33%;
}

.wiki-detail-text {
  margin-left: 0;
  color: var(--wiki-description-black);
  word-wrap: break-word;
  width: 66.67%; /* 8/12 */
  max-width: 66.67%;
}
</style>
