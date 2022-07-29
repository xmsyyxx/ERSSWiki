<template>
  <div class="wiki-avatar-card">
    <div class="wiki-card-content">
      <div class="wiki-card-avatar">
        <img :src="img" />
      </div>
      <div class="wiki-card-name"><slot></slot></div>
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

<style scoped>
.wiki-avatar-card {
  display: flex;
  justify-content: flex-start;
  margin: 20px auto;
  overflow: hidden;
}

.wiki-card-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 350px;
  height: 80px;
  text-decoration: none;
  color: var(--wiki-description-black);
  font-weight: 500;
  padding: 12px;
  border-radius: 12px;
  background-color: var(--wiki-card-gray);
  box-sizing: border-box;
}

.wiki-card-avatar {
  width: 60px;
  height: 60px;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 6px;
  object-fit: contain;
}

@media only screen and (max-width: 500px) {
  .wiki-avatar-card {
    position: relative;
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }
}
</style>
