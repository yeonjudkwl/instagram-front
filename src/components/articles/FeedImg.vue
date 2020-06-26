<template>
  <div>
    <div class="title">
      <img src="@/assets/images/hong.png" alt="profile-image" class="img">
      <p>{{ feed.user.username }}</p>
    </div>
    <img :src="url" alt="feed-image" class="con_img">
  </div>
</template>

<script>
import SERVER from '@/api/drf'

export default {
  name: 'FeedImg',
  props: {
    feed: Object,
  },
  computed: {
    url () {
      const img = this.feed.images[0].image
      return SERVER.URL + img
    }
  },
}
</script>

<style scoped>
.img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title{
  display: flex;
  align-items: center;
  margin: 10px;
}
.title p{
  margin: 0 15px;
  font-size: 20px;
}
.con_img{
  width: 100%;
}
</style>
