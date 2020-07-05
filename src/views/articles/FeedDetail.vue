<template>
  <div class="feed-detail-wrap">
    <div class="feed-detail">
      <div class="feed-detail-img">
        <FeedImg :feed="feed"/>
      </div>
      <div class="feed-detail-content">
        <FeedTitle :feed="feed"/>
        <p>{{ feed.content }}</p>
        <FeedComment :feed="feed"/>
        <div class="feed-detail-content-bottom">
          <FeedLogo :feed="feed"/>
          <div class="content">
            <p class="content-like">좋아요 {{ feed.like_count }}개</p>
          </div> 
          <FeedCommentForm :feed="feed"/>
        </div>
      </div>
    </div>
    <hr>
    <MyFeed />
  </div>
</template>

<script>
import FeedTitle from '@/components/articles/FeedTitle.vue'
import FeedImg from '@/components/articles/FeedImg.vue'
import FeedLogo from '@/components/articles/FeedLogo.vue'
import FeedComment from '@/components/articles/FeedComment.vue'
import FeedCommentForm from '@/components/articles/FeedCommentForm.vue'
import MyFeed from '@/components/articles/MyFeed.vue'

export default {
  name: 'FeedDetail',
  components: {
    FeedTitle,
    FeedImg,
    FeedLogo,
    FeedComment,
    FeedCommentForm,
    MyFeed,
  },
  computed: {
    feed () {
      return this.$route.params.feed
    } 
  }
}
</script>

<style scoped>
.feed-detail-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.feed-detail {
  display: flex;
  margin-top: 30px;
  width: 50%;
  border: 1px solid #DBDBDB;
  border-radius: 2px;
}
.feed-detail-img {
  flex: 2;
}
.feed-detail-content {
  flex: 1;
  position: relative;
}
.feed-detail-content p {
   padding: 10px;
}
.content-like {
  color: rgb(126, 126, 126);
}
.feed-detail-content-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
}
hr {
  margin: 25px 0;
  width: 50%;
  color: #DBDBDB;
}
</style>
