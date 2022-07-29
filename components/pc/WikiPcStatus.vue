<template>
  <section class="wiki-status">
    <div class="wiki-status-tips">词条统计</div>
    <div class="wiki-status-list">
      <ul>
        <li v-if="created" class="wiki-status-item">
          <div class="wiki-status-title">创建时间</div>
          <div class="wiki-status-text">{{ formatTime(created) }}</div>
        </li>
        <li v-if="updated" class="wiki-status-item">
          <div class="wiki-status-title">更新时间</div>
          <div class="wiki-status-text">{{ formatTime(updated) }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "WikiPcStatus",
  props: {
    created: {
      type: String,
      default: "",
    },
    updated: {
      type: String,
      default: "",
    },
  },
  methods: {
    formatTime(time) {
      return dayjs(time).format("YYYY年MM月DD日");
    },
  },
};
</script>

<style scoped>
.wiki-status {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border: 1px solid var(--wiki-card-border-gray);
  border-radius: 5px;
  background-color: var(--wiki-card-gray);
}

.wiki-status-tips {
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 1rem;
  margin-top: 1rem;
  color: var(--wiki-description-black);
}

.wiki-status-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.wiki-status-list ul {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 0;
  list-style: none;
  width: 100%;
}

.wiki-status-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.wiki-status-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  float: left;
  color: #444;
  word-wrap: break-word;
  width: 33.33%;
  max-width: 33.33%;
  border-bottom: 1px solid var(--wiki-border-gray);
}

.wiki-status-text {
  margin-left: 0;
  color: var(--wiki-description-black);
  word-wrap: break-word;
  width: 66.67%;
  max-width: 66.67%;
  border-bottom: 1px solid var(--wiki-border-gray);
}
</style>
