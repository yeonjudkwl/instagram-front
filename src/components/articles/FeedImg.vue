<template>
  <div>
    <div class="title">
      <img src="@/assets/images/hong.png" alt="profile-image" class="img">
      <p @click="fetchUserInfoPushProfile(feed.user.username)">{{ feed.user.username }}</p>
      <span style="margin-right: 10px;" ><router-link :to="{ name: 'FeedUpdate', params: { id: feed.id } }">수정</router-link></span>
      <span v-if="feed.user.username === $store.state.username" @click="deleteFeed(feed.id)">삭제</span>
    </div>
    <img :src="url" alt="feed-image" class="con_img">
  </div>
</template>

<script>
import SERVER from '@/api/drf'
import { mapActions } from 'vuex'

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
  methods: {
    ...mapActions(['fetchUserInfoPushProfile', 'deleteFeed'])
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
  cursor: pointer;
}
.con_img{
  width: 100%;
}
</style>
