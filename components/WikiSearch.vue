<template>
  <div class="wiki-search">
    <div class="wiki-icon-search" @click="onClickSearchIcon">
      <IconSearch />
    </div>
    <div v-if="isStartSearch" class="wiki-search-container">
      <input
        v-model="searchQuery"
        class="wiki-search-input"
        type="search"
        autocomplete="off"
      />
    </div>
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
      //   this.isStartSearch = true;
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
  position: absolute;
  left: 1rem;
  right: 1rem;
}

.wiki-search-input {
  width: 100%;
}
</style>
