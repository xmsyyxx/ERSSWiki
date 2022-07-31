<template>
  <div v-if="data" class="wiki-details">
    <div class="wiki-details-tips">基本信息</div>
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
  </div>
</template>

<script>
export default {
  name: "WikiPcDetailsList",
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
  margin-top: 1rem;
  border: 1px solid var(--wiki-card-border-gray);
  border-radius: 5px;
  background-color: var(--wiki-card-gray);
}

.wiki-details-tips {
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 1rem;
  margin-top: 1rem;
  color: var(--wiki-description-black);
}

.wiki-detail-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.wiki-detail-list ul {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 0;
  list-style: none;
  width: 100%;
}

.wiki-detail-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.wiki-detail-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  float: left;
  color: var(--wiki-content-black);
  word-wrap: break-word;
  width: 33.33%; /* 4/12 */
  max-width: 33.33%;
  border-bottom: 1px solid var(--wiki-border-gray);
}

.wiki-detail-text {
  margin-left: 0;
  color: var(--wiki-description-black);
  word-wrap: break-word;
  width: 66.67%; /* 8/12 */
  max-width: 66.67%;
  border-bottom: 1px solid var(--wiki-border-gray);
}
</style>
