<template>
  <div class="wiki-avatar">
    <div class="wiki-card__content">
      <div class="wiki-card__avatar">
        <WikiPicture :src="img" :clickable="false" />
      </div>
      <div class="wiki-card__name"><slot></slot></div>
    </div>
  </div>
</template>

<script>
import WikiPicture from "./WikiPicture.vue";

export default {
  name: "WikiAvatarCard",
  components: {
    WikiPicture,
  },
  props: {
    img: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wiki-avatar {
  display: flex;
  justify-content: flex-start;
  margin-top: 0;
  margin-bottom: 0.8rem;
  overflow: hidden;
}

.wiki-card__content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  min-width: 300px;
  height: 80px;
  text-decoration: none;
  color: $wiki-description-black;
  font-weight: 500;
  padding: 12px;
  border-radius: 12px;
  background-color: $wiki-card-gray;
  box-sizing: border-box;
}

.wiki-card__avatar {
  width: 60px;
  height: 60px;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 6px;
  object-fit: contain;
}

@media only screen and (max-width: 500px) {
  .wiki-avatar {
    position: relative;
    width: calc(100% - 2rem);
    margin: 0.5rem 1rem;
  }
}
</style>

<style lang="scss">
.wiki-avatar__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .wiki-avatar {
    margin-right: 1rem;
  }
}

@media only screen and (max-width: 500px) {
  .wiki-avatar__list {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
  }
}
</style>
