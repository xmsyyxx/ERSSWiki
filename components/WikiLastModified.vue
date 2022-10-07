<template>
  <div class="wiki-modified">
    <div class="wiki-modified__box">
      <div class="wiki-modified__maim">
        <div class="wiki-modified__icon icon-time">
          <IconTime />
        </div>
        <div class="wiki-modified__content">
          <span>
            最后更新于 <strong>{{ lastModifiedTime }}</strong>
          </span>
        </div>
      </div>
      <div class="wiki-modified__icon icon-printer">
        <!-- <IconPrinter /> -->
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import IconTime from "./icons/IconTime.vue";
// import IconPrinter from "./icons/IconPrinter.vue";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export default {
  name: "WikiLastModified",
  props: {
    lastModified: {
      type: String,
      default: "",
    },
  },
  components: {
    IconTime,
    // IconPrinter,
  },
  computed: {
    lastModifiedTime() {
      return dayjs(this.lastModified).fromNow();
    },
  },
};
</script>

<style lang="scss" scoped>
.wiki-modified {
  display: block;
  // border-bottom: solid 1px #c8ccd1;
  // border-top: solid 1px #c8ccd1;
  // background-color: #eaecf0;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
}

.wiki-modified__box {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
}

.wiki-modified__maim {
  display: flex;
  flex-direction: row;
}

.wiki-modified__content {
  margin: auto 0;
}

.wiki-modified__icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
</style>
