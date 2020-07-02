<template>
  <div class="profile-feeds">
    <div v-for="feed in $store.state.userInfo.feed_set" :key="feed.id" class="profile-feed">
      <div v-for="img in feed.images" :key="img">
        <img :src="'http://127.0.0.1:8000'+ img.image" alt="feed-image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFeed',
}
</script>

<style scoped>
.profile-feeds{
  width: 70%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
}
.profile-feed{
  width: 200px;
  margin: 13px;
}
.profile-feed img{
  width: 100%;
}
@media screen and (max-width: 1000px) {
  .profile-feed{
    flex: 25%;
    margin: 4%;
  }
  .profile-feed img{
    width: 100%;
  }
}
</style>
