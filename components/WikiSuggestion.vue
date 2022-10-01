<template>
  <div class="wiki-suggestion">
    <div class="wiki-suggestion__tips">随便看看：</div>
    <ul class="wiki-suggestion__list">
      <li v-for="(item, index) of suggestionList" :key="index + item">
        <NuxtLink :to="path + item">
          <span class="wiki-suggestion__item">{{ item }}</span>
        </NuxtLink>
        <span
          v-show="index !== suggestionList.length - 1"
          class="wiki-suggestion__separator"
          >|</span
        >
      </li>
    </ul>
    <div class="wiki-suggestion__reload" @click="handleSuggestion">
      <IconReload />
    </div>
  </div>
</template>

<script>
import { isMobile, randomNum } from "../assets/js/init";
import IconReload from "./icons/IconReload.vue";

export default {
  name: "WikiSuggestion",
  components: {
    IconReload,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      limit: 5,
      path: "/item/",
      suggestionList: [],
    };
  },
  mounted() {
    const onresize = () => {
      this.path = window.outerWidth < 500 ? "/wiki/" : "/item/";
      if (isMobile()) {
        this.limit = 3;
      } else {
        this.limit = 5;
      }
      this.handleSuggestion();
    };
    onresize();
    window.addEventListener("resize", onresize);
  },
  methods: {
    handleSuggestion() {
      const list = [];
      for (let i = 0; list.length < this.limit; i++) {
        const n = randomNum(0, this.data.length - 1);
        if (this.data[n]?.title) {
          list.push(this.data[n].title);
        }
      }
      this.suggestionList = list;
    },
  },
};
</script>

<style lang="scss" scoped>
.wiki-suggestion {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
}
.wiki-suggestion__list {
  display: flex;
  flex-direction: row;
  padding-left: 0;

  li {
    // margin: 1rem;
    list-style: none;

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
}

.wiki-suggestion__separator {
  margin-left: 1rem;
}

.wiki-suggestion__tips {
  margin-right: 0.5rem;
}

.wiki-suggestion__reload {
  margin-left: 1rem;
  cursor: pointer;
}

@media only screen and (max-width: 500px) {
  .wiki-suggestion {
    flex-direction: column;
  }

  .wiki-suggestion__list {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 0.5rem;

    li {
      list-style: none;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin-top: 0.5rem;
      padding: 0.1rem 0.7rem;
      /* margin-right: auto; */
      width: fit-content;
      margin: 0.25rem auto;
    }

    li:not(:first-child) {
      margin-left: auto;
    }
  }

  .wiki-suggestion__separator,
  .wiki-suggestion__reload {
    display: none;
  }

  .wiki-suggestion__tips {
    margin-right: 0;
  }
}
</style>
