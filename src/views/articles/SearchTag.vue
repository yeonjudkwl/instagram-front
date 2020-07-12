<template>
  <div class="search-feeds">
    <div v-for="feed in $store.state.searched" :key="feed.id" class="search-feed">
      <router-link :to="{ name: 'FeedDetail', params: { id: feed.id } }">
        <div v-for="img in feed.images" :key="img.id">
          <img :src="'http://127.0.0.1:8000'+ img.image" alt="feed-image" class="search-feed-img">
          <div class="search-feed-img-hover">
            <span><i class="fas fa-heart"></i>{{ feed.like_count }}</span>
            <span><i class="fas fa-comment"></i>{{ feed.comment_count }}</span>
          </div>
        </div>
      </router-link>
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
  position: relative;
}
.search-feed img{
  width: 100%;
  cursor: pointer;
}
.search-feed-img-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* 원래 위치 없애기 */
  position: absolute;
  /* text 위로 옮기기 */
  transform: translateY(-100%);
  background: rgba(0, 0, 0);
  color: rgb(255, 255, 255);
  border-radius: 5px;
  opacity: 0;
  transition: .5s ease;
}
.search-feed:hover .search-feed-img-hover{
  opacity: .4;
}
.search-feed-img-hover span {
  margin-right: 10px;
}
.search-feed-img-hover i {
  margin: 0 5px;
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
