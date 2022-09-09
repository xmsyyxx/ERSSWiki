<template>
  <div class="wiki-status">
    <div class="wiki-status__tips">词条统计</div>
    <div class="wiki-status__list">
      <ul>
        <li v-if="created" class="wiki-status__item">
          <div class="wiki-status__title">创建时间</div>
          <div class="wiki-status__text">{{ formatTime(created) }}</div>
        </li>
        <li v-if="updated" class="wiki-status__item">
          <div class="wiki-status__title">更新时间</div>
          <div class="wiki-status__text">{{ formatTime(updated) }}</div>
        </li>
      </ul>
    </div>
  </div>
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

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-status {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border: 1px solid $wiki-card-border-gray;
  border-radius: 5px;
  background-color: $wiki-card-gray;
}

.wiki-status__tips {
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 1rem;
  margin-top: 1rem;
  color: $wiki-description-black;
}

.wiki-status__list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;

  ul {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    padding: 0;
    list-style: none;
    width: 100%;
  }
}

.wiki-status__item {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.wiki-status__title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  float: left;
  color: $wiki-content-black;
  word-wrap: break-word;
  width: 33.33%;
  max-width: 33.33%;
  border-bottom: 1px solid $wiki-border-gray;
}

.wiki-status__text {
  margin-left: 0;
  color: $wiki-description-black;
  word-wrap: break-word;
  width: 66.67%;
  max-width: 66.67%;
  border-bottom: 1px solid $wiki-border-gray;
}
</style>
