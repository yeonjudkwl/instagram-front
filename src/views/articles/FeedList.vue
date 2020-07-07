<template>
  <div class="feed-list-wrap">
    <div class="feed-list">
      <Feed class="feed" :feed="feed" v-for="feed in $store.state.feeds" :key="feed.id"/>
    </div>
    <div class="sub-feed">
      <div class="profile">
        <img src="@/assets/images/hong.png" alt="" class="banner-img">
        <div>
          <p>{{ $store.state.username }}</p>
          <small v-if="$store.state.userInfo">{{ $store.state.userInfo.name }}</small>
        </div>
      </div>       
      <div class="banner">
        <div class="banner-title">
          <p>회원님을 위한 추천</p>
          <p><b>모두 보기</b></p>
        </div>
        <div class="banner-content">
          <img src="@/assets/images/hong.png" alt="" class="banner-img">
          <p>User name</p>
        </div>
        <div class="banner-content">
          <img src="@/assets/images/hong.png" alt="" class="banner-img">
          <p>User name</p>
        </div>
        <div class="banner-content">
          <img src="@/assets/images/hong.png" alt="" class="banner-img">
          <p>User name</p>
        </div>
        <div class="banner-content">
          <img src="@/assets/images/hong.png" alt="" class="banner-img">
          <p>User name</p>
        </div>
        <div class="banner-content">
          <img src="@/assets/images/hong.png" alt="" class="banner-img">
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
.profile small{
  margin-left: 15px;
}
.banner{
    width: 250px;
    height: 320px;
    margin: 20px 5px;
    padding: 10px;
    border: 1px solid #DBDBDB;
    border-radius: 3px;
    overflow: auto;            
}
.banner-title{
    display:flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.banner-title p:nth-child(1){   
    color: #999999;
    font-size: 14px;
}
.banner-title p:nth-child(2){  
    color: #262626;
    font-size: 12px;
}
.banner-img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.banner-content{
    display: flex;
    align-items: center;
    margin: 10px;
}
.banner-content p{
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
