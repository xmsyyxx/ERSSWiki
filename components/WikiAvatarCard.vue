<template>
  <div class="wiki-avatar">
    <div class="wiki-card__content">
      <div class="wiki-card__avatar">
        <img :src="img" />
      </div>
      <div class="wiki-card__name"><slot></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiAvatarCard",
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
  margin: 20px auto;
  overflow: hidden;
}

.wiki-card__content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 350px;
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
    margin: 0 1rem;
  }
}
</style>
