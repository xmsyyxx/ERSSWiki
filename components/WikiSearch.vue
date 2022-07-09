<template>
  <div class="wiki-search">
    <div class="wiki-icon-search" @click="onClickSearchIcon">
      <IconSearch />
    </div>
    <!-- <div v-if="isStartSearch" class="wiki-search-container">
      <IconSearch class="wiki-search-input-icon" />
      <div class="wiki-search-input">
        <input v-model="searchQuery" type="search" autocomplete="off" />
      </div>
    </div> -->
  </div>
</template>

<script>
import IconSearch from "./icons/IconSearch.vue";

export default {
  name: "WikiSearch",
  components: {
    IconSearch,
  },
  data() {
    return {
      isStartSearch: false,
      searchQuery: "",
    };
  },
  methods: {
    onClickSearchIcon() {
      // this.isStartSearch = true;
    },
  },
};
</script>

<style scoped>
.wiki-search {
  font-size: 1.5rem;
  width: 16.67%; /* 2/12 */
  text-align: center;
  color: #000;
}

.wiki-search-container {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.wiki-search-input {
  margin-left: 1rem;
  margin-right: 1rem;
}

.wiki-search-input > input {
  width: 100% !important;
  box-sizing: border-box;
  border: 0;
  height: 2rem;
  font-size: 1rem;
  color: #333;
  border-radius: 10px;
  outline: 0;
}

.wiki-search-input-icon {
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 1.5rem;
}
</style>
