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
    <div class="profile-feeds">
      <div v-for="f in detail.user.feed_set" :key="f.id" class="profile-feed">
        <div v-for="img in f.images" :key="img.id">
          <img :src="'http://127.0.0.1:8000'+ img.image" alt="feed-image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SERVER from '@/api/drf'
import axios from 'axios'
import FeedTitle from '@/components/articles/FeedTitle.vue'
import FeedImg from '@/components/articles/FeedImg.vue'
import FeedLogo from '@/components/articles/FeedLogo.vue'
import FeedComment from '@/components/articles/FeedComment.vue'
import FeedCommentForm from '@/components/articles/FeedCommentForm.vue'

export default {
  name: 'FeedDetail',
  components: {
    FeedTitle,
    FeedImg,
    FeedLogo,
    FeedComment,
    FeedCommentForm,
  },
  data () {
    return {
      detail: null
    }
  },
  computed: {
    feed () {
      return this.$route.params.feed
    } 
  },
  methods: {
    fetchFeed () {
      axios.get(SERVER.URL + `/articles/${this.feed.id}/`)
        .then ( res => {
          this.detail = res.data
        })
        .catch(err => console.log(err.response.data))
    }
  },
  created () {
    this.fetchFeed()
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
