<template>
  <div class="feed-list-wrap">
    <div class="feed-list">
      <Feed class="feed" :feed="feed" v-for="feed in $store.state.feeds" :key="feed.id"/>
    </div>
    <div class="sub-feed">
      <div class="profile">
        <img src="@/assets/images/hong.png" alt="" class="story_img">
        <p>yeonju</p>
      </div>
      <!-- Story목록이 들어갑니다. -->      
      <div class="story">
        <div class="story_title">
          <p>스토리</p>
          <p><b>모두 보기</b></p>
        </div>
        <!-- story를 업로드 한 user의 프로필 사진과 이름이 들어갑니다. -->
        <div class="story_content">
          <img src="@/assets/images/hong.png" alt="" class="story_img">
          <p>User name</p>
        </div>
        <div class="story_content">
          <img src="@/assets/images/hong.png" alt="" class="story_img">
          <p>User name</p>
        </div>
        <div class="story_content">
          <img src="@/assets/images/hong.png" alt="" class="story_img">
          <p>User name</p>
        </div>
        <div class="story_content">
          <img src="@/assets/images/hong.png" alt="" class="story_img">
          <p>User name</p>
        </div>
      </div>      
      <div class="story">
        <div class="story_title">
          <p>회원님을 위한 추천</p>
          <p><b>모두 보기</b></p>
        </div>
        <!-- story를 업로드 한 user의 프로필 사진과 이름이 들어갑니다. -->
        <div class="story_content">
          <img src="@/assets/images/hong.png" alt="" class="story_img">
          <p>User name</p>
        </div>
        <div class="story_content">
          <img src="@/assets/images/hong.png" alt="" class="story_img">
          <p>User name</p>
        </div>
        <div class="story_content">
          <img src="@/assets/images/hong.png" alt="" class="story_img">
          <p>User name</p>
        </div>
        <div class="story_content">
          <img src="@/assets/images/hong.png" alt="" class="story_img">
          <p>User name</p>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import Feed from '@/components/articles/Feed.vue'
import { mapActions } from 'vuex'


export default {
  name: 'List',
  components: {
    Feed,
  },
  methods: {
    ...mapActions(['fetchFeeds'])
  },
  created () {
    this.fetchFeeds()
  }
}
</script>

<style scoped>
.feed-list-wrap{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
  padding: 0 23%;
}
.feed-list{
  flex: 2;
  margin: 10px 0;
  margin-right: 30px;
}
.feed-list .feed{
  width: 600px;
  margin-bottom: 50px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  background-color: #ffffff;
}
.sub-feed{
  flex: 1;
  position: sticky;
  top: 50px;
}
.profile{
    display: flex;
    margin: 10px;
}
.profile p{
    margin: 5px 15px;
    font-size: 20px;
}
.story{
    width: 250px;
    height: 170px;
    margin: 20px 5px;
    padding: 10px;
    border: 1px solid #DBDBDB;
    border-radius: 3px;
    overflow: auto;             /* div의 크기보다 내용이 더 많으면 스크롤이 생기게 해줍니다.*/
}
.story_title{
    display:flex;
    justify-content: space-between;
}
.story_title p:nth-child(1){    /*`class="story_title"`의 첫 번째 `p`를 가리킵니다.("스토리")*/
    color: #999999;
    font-size: 14px;
}
.story_title p:nth-child(2){    /*`class="story_title"`의 두 번째 `p`를 가리킵니다.("모두 보기")*/
    color: #262626;
    font-size: 12px;
}
.story_img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.story_content{
    display: flex;
    margin: 10px;
}
.story_content p{
    margin: 5px 15px;
    font-size: 16px;
}
@media screen and (max-width: 1000px) {
  .sub-feed{
    display: none;
  }
}
@media screen and (max-width: 700px) {
  .feed-list .feed{
      margin: 0 auto 50px;
      width: 450px;
  }
}
</style>
