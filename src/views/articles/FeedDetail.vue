<template>
  <div class="feed-detail-wrap">
    <div class="feed-detail">
      <div class="feed-detail-img">
        <FeedImg :feed="detail" />
      </div>
      <div class="feed-detail-content">
        <FeedTitle :feed="detail" />
        <p>{{ detail.content }}</p>
        <FeedComment :feed="detail" />
        <div class="feed-detail-content-bottom">
          <FeedLogo :feed="detail" />
          <div class="content">
            <p class="content-like">좋아요 {{ detail.like_count }}개</p>
          </div>
          <FeedCommentForm :feed="detail" />
        </div>
      </div>
    </div>
    <hr />
    <div class="profile-feeds">
      <div v-for="f in detail.user.feed_set" :key="f.id" class="profile-feed">
        <router-link :to="{ name: 'FeedDetail', params: { id: feed.id } }">
          <div v-for="img in f.images" :key="img.id">
            <img :src="'http://127.0.0.1:8000'+ img.image" alt="feed-image" class="profile-feed-img">
            <div class="profile-feed-img-hover">
              <span><i class="fas fa-heart"></i>{{ feed.like_count }}</span>
              <span><i class="fas fa-comment"></i>{{ feed.comment_count }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SERVER from "@/api/drf";
import axios from "axios";
import FeedTitle from "@/components/articles/FeedTitle.vue";
import FeedImg from "@/components/articles/FeedImg.vue";
import FeedLogo from "@/components/articles/FeedLogo.vue";
import FeedComment from "@/components/articles/FeedComment.vue";
import FeedCommentForm from "@/components/articles/FeedCommentForm.vue";

export default {
  name: "FeedDetail",
  components: {
    FeedTitle,
    FeedImg,
    FeedLogo,
    FeedComment,
    FeedCommentForm
  },
  data() {
    return {
      detail: null
    };
  },
  computed: {
    feed() {
      return this.$route.params.id;
    }
  },
  methods: {
    fetchFeed(feedId) {
      axios
        .get(SERVER.URL + `/articles/${feedId}/`)
        .then(res => {
          this.detail = res.data;
        })
        .catch(err => console.log(err.response.data));
    }
  },
  created() {
    this.fetchFeed(this.feed);
  }
};
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
  border: 1px solid #dbdbdb;
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
  color: #dbdbdb;
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
  position: relative;
}
.profile-feed-img{
  width: 100%;
  cursor: pointer;
}
.profile-feed-img-hover {
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
.profile-feed:hover .profile-feed-img-hover{
  opacity: .4;
}
.profile-feed-img-hover span {
  margin-right: 10px;
}
.profile-feed-img-hover i {
  margin: 0 5px;
}
@media screen and (max-width: 1000px) {
  .profile-feed {
    flex: 25%;
    margin: 4%;
  }
  .profile-feed img {
    width: 100%;
  }
}
</style>
