<template>
  <div>
    <FeedImg :feed="feed"/>
    <FeedLogo :feed="feed"/>
    <div class="content">
        <p class="content-like">좋아요 {{ feed.like_count }}개</p>
        <p><span @click="fetchUserInfo(feed.user.username)" class="user">{{ feed.user.username }}</span>{{ feed.content }}</p>
        <FeedComment />
    </div>    
  </div>
</template>

<script>
import FeedImg from '@/components/articles/FeedImg.vue'
import FeedLogo from '@/components/articles/FeedLogo.vue'
import FeedComment from '@/components/articles/FeedComment.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Feed',
  components: {
    FeedImg,
    FeedLogo,
    FeedComment,
  },
  props: {
    feed: Object,
  },
  methods: {
    ...mapActions(['fetchUserInfo'])
  },
}
</script>

<style scoped>
.content{
  padding: 10px;
}
.content p{
  margin-bottom: 10px;
}
.content-like {
  font-weight: bold;
}
.user {
  margin-right: 10px;
  cursor: pointer;
}
</style>
