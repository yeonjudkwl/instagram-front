<template>
  <div class="search-feeds">
    <div v-for="feed in $store.state.searched" :key="feed.id" class="search-feed">
      <div v-for="img in feed.images" :key="img.id">
        <img :src="'http://127.0.0.1:8000'+ img.image" alt="feed-image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
 name: 'SearchTag.vue',

}
</script>

<style scoped>
.search-feeds{
  width: 70%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
}
.search-feed{
  width: 200px;
  margin: 13px;
}
.search-feed img{
  width: 100%;
}
@media screen and (max-width: 1000px) {
  .search-feed{
    flex: 25%;
    margin: 4%;
  }
  .search-feed img{
    width: 100%;
  }
}
</style>
