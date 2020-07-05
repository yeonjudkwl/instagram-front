<template>
  <div>
    <div class="title">
      <img src="@/assets/images/hong.png" alt="profile-image" class="img">
      <p @click="fetchUserInfoPushProfile(feed.user.username)">{{ feed.user.username }}</p>
      <i v-if="feed.user.username === $store.state.username" @click="openModalBox" class="fas fa-ellipsis-h modal-btn"></i>
    </div>
    <img :src="url" alt="feed-image" class="con_img">
    <!-- 모달 배경 -->
    <div :id="'block'+feed.id" @click="closeModalBox" class="modal-block">

    </div>
    <!-- 모달 -->
    <div :id="'modal'+feed.id" class="modal-box">
      <p><router-link :to="{ name: 'FeedUpdate', params: { id: feed.id, img: url } }">수정</router-link></p>
      <p @click="deleteFeed(feed.id)">삭제</p>
      <p>게시물로 이동</p>
      <p>프로필 수정</p>
      <div @click="closeModalBox" class="btn_close">X</div>
    </div>
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
    ...mapActions(['fetchUserInfoPushProfile', 'deleteFeed']),
    openModalBox () {
      const modal = document.querySelector(`#modal${this.feed.id}`)
      const block = document.querySelector(`#block${this.feed.id}`)

      modal.classList.add('active')
      block.classList.add('active')
    },
    closeModalBox () {
      const modal = document.querySelector(`#modal${this.feed.id}`)
      const block = document.querySelector(`#block${this.feed.id}`)
      
      modal.classList.remove('active')
      block.classList.remove('active')
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
  position: relative;
}
.title p{
  margin: 0 15px;
  font-size: 20px;
  cursor: pointer;
}
.con_img{
  width: 100%;
}
.modal-btn {
  position: absolute;
  top: 15px;
  right: 10px;
  color: rgb(150, 150, 150);
  cursor: pointer;
}
.modal-box{
  display: none;          /* 평상시에 라이트 박스를 안 보이게 함. */
}
.modal-box p {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid rgb(150, 150, 150);
  cursor: pointer;
}
.modal-box p a {
  text-decoration: none;
}
.modal-box.active{           
  display: block;         /* 활성화(active 클래스)될 때 라이트 박스를 보이게 함. */
  position: fixed;
  padding: 30px;
  width: 300px;
  left: 50vw;
  margin-left: -150px;    /* width의 절반 */
  top: 50vh;
  margin-top: -150px;
  box-sizing: border-box;
  border-radius: 5px;
  background: rgba(255, 255, 255);
  overflow: hidden;
  z-index: 99;
}
.btn_close{
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  color: rgb(150, 150, 150);
  cursor: pointer;
}
.modal-block{
  display: none;
}
.modal-block.active{
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #111;
  opacity: 0.5;
  z-index: 9;
}
</style>
