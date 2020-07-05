<template>
  <div>
    <FeedTitle :feed="feed"/>
    <FeedImg :feed="feed"/>
    <FeedLogo :feed="feed"/>
    <div class="content">
        <p class="content-like">좋아요 {{ feed.like_count }}개</p>
        <p><span @click="fetchUserInfoPushProfile(feed.user.username)" class="user">{{ feed.user.username }}</span>{{ feed.content }}</p>
        <FeedComment :feed="feed"/>
        <FeedCommentForm :feed="feed"/>
    </div>    
  </div>
</template>

<script>
import FeedTitle from '@/components/articles/FeedTitle.vue'
import FeedImg from '@/components/articles/FeedImg.vue'
import FeedLogo from '@/components/articles/FeedLogo.vue'
import FeedComment from '@/components/articles/FeedComment.vue'
import FeedCommentForm from '@/components/articles/FeedCommentForm.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Feed',
  components: {
    FeedTitle,
    FeedImg,
    FeedLogo,
    FeedComment,
    FeedCommentForm
  },
  props: {
    feed: Object,
  },
  methods: {
    ...mapActions(['fetchUserInfoPushProfile'])
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
