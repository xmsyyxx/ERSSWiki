<template>
  <div class="wiki-details-list" v-if="this.data">
    <div v-if="infoKeys" class="wiki-details">
      <ul>
        <li v-for="key of infoKeys" :key="key" class="wiki-detail-item">
          <div class="wiki-detail-title">{{ key }}</div>
          <div class="wiki-detail-text">{{ data[key] }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiDetailsList",
  props: {
    data: Object,
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
  font-size: 1.1rem;
}

.wiki-details ul {
  margin: 1rem;
  padding: 0;
  list-style: none;
}

.wiki-detail-item {
  position: relative;
  display: flex;
}

.wiki-detail-title {
  float: left;
  color: #333;
  word-wrap: break-word;
  width: 33.33%; /* 4/12 */
  max-width: 33.33%;
}

.wiki-detail-text {
  margin-left: 0;
  color: #666;
  word-wrap: break-word;
  width: 66.67%; /* 8/12 */
  max-width: 66.67%;
}
</style>
