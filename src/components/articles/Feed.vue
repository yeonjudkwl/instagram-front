<template>
  <div>
    <FeedImg :feed="feed"/>
    <FeedLogo />
    <div class="content">
        <p class="content-like">좋아요 80개</p>
        <p><a href="" class="user">{{ feed.user.username }}</a>{{ feed. content }}</p>
        <FeedComment />
    </div>    
  </div>
</template>

<script>
import FeedImg from '@/components/articles/FeedImg.vue'
import FeedLogo from '@/components/articles/FeedLogo.vue'
import FeedComment from '@/components/articles/FeedComment.vue'

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
}
</style>
