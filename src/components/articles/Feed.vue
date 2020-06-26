<template>
  <div>
    <div class="title">
        <img src="@/assets/images/hong.png" alt="profile-image" class="img">
        <p>{{ feed.user.username }}</p>
    </div>
    <img :src="url" alt="feed-image" class="con_img">
    <div class="logos">
        <div class="logos_left">
            <i class="logo_img far fa-heart"></i>
            <!-- <i class="logo_img fas fa-heart heart-color"></i> -->
            <i class="logo_img far fa-comment"></i>
            <!-- <svg aria-label="Direct"  class="_8-yf5" fill="#262626" height="23" viewBox="-10 -13 48 48" width="23">
              <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
            </svg> -->
            
        </div>
        <div class="logos_right">
            <i class="logo_img far fa-bookmark"></i>
        </div>
    </div>
    <div class="content">
        <p class="content-like">좋아요 80개</p>
        <p><a href="" class="user">{{ feed.user.username }}</a>{{ feed. content }}</p>
        <form action="" class="comment-form">
          <label for="contentComment" class="a11y-hidden">comment: </label>
          <input type="text" class="comment" id="contentComment" placeholder="댓글달기">
          <button class="comment-btn">게시</button>
        </form>
    </div>    
  </div>
</template>

<script>
import SERVER from '@/api/drf'

export default {
  name: 'Feed',
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
.logos{
  display:flex;
  justify-content: space-between;
  padding: 0 10px;
}
.logo_img{
  padding: 10px;
  transform: scale(1.5);
}
.heart-color {
  color: crimson;
}
.content{
  padding: 10px;
}
.content p{
  margin-bottom: 10px;
}
.content-like {
  font-weight: bold;
}
.comment-form{
  position: relative;
}
.comment{
  width: 100%;
  height: 45px;
  border: none;
  border-top: 1px solid #DBDBDB;
  color: #999999;
  font-size: 16px;
}
.comment-btn {
  position: absolute;
  top: 15px;
  right: 10px;
  background: none;
  border: none;
  color: rgba(90, 170, 255);
  cursor: pointer;
  /* rgb(53, 150, 255); */
}
.comment:focus, .comment-btn:focus{
  outline: none;
}
.user {
  margin-right: 10px;
}
</style>
