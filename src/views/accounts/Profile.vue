<template>
  <div>
    <div class="profile-wrap">
      <div class="profile-header">
        <div class="profile-img">
          <img :src="url" alt="profile">
        </div>
        <div class="profile-content">
          <p>
            {{ $store.state.userInfo.username }}
            <span v-if="isMyProfile">
              <button class="profile-update-btn"><router-link :to="{ name: 'ProfileUpdate', params: { username: $store.state.username } }">프로필 편집</router-link></button>
            </span>
            <span v-else>
              <button v-if="isFollower" @click="unfollow($store.state.userInfo.username);isFollow()" class="profile-follow-btn unfollow-btn">언팔로우</button>
              <button v-else @click="follow($store.state.userInfo.username);isFollow()" class="profile-follow-btn">팔로우</button>
            </span>
          </p>
          <span class="profile-follow">팔로워 <span class="profile-follow-cnt">{{ $store.state.userInfo.followers_count }}</span></span>
          <span class="profile-follow">팔로우 <span class="profile-follow-cnt">{{ $store.state.userInfo.following_count }}</span></span>
          <span v-if="isMyProfile">
            <button @click="deleteUserInfo($store.state.userInfo.username)" class="profile-delete-btn">회원 탈퇴</button>
          </span>
          <div class="profile-description">
            <small v-if="$store.state.userInfo.name !== 'null' " >{{ $store.state.userInfo.name }}</small><small>{{ this.gender }}</small>
            <p v-if="$store.state.userInfo.description !== 'null'" >{{ $store.state.userInfo.description }}</p>
          </div>
          {{ this.private_user }}
        </div>
      </div>
      <hr>
      <div class="profile-feeds">
        <div v-for="feed in $store.state.userInfo.feed_set" :key="feed.id" class="profile-feed">
          <router-link :to="{ name: 'FeedDetail', params: { id: feed.id } }">
            <div v-for="img in feed.images" :key="img.id">
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
  </div>
</template>

<script>
import SERVER from '@/api/drf'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      isFollower: false,
      gender: null,
      private_user: null,
    }
  },
  computed: {
    isMyProfile () {
      return this.$store.state.userInfo.username === this.$store.state.username
    },
    url () {
      const img = this.$store.state.userInfo.profile_photo
      return SERVER.URL + img
    },
    ...mapState(['isFollower']),
  },
  methods: {
    ...mapActions(['follow', 'unfollow', 'deleteUserInfo']),
    isFollowers () {
      if (this.$store.state.userInfo.followers) {
        this.$store.state.userInfo.followers.forEach( data => {
          if (data.username === this.$store.state.username) {
            this.isFollower = true
          }
        })
      }
    },
    isFollow () {
      this.isFollower = !this.isFollower
    },
    fetchGender () {
      if (this.$store.state.userInfo.gender === "female") {
        this.gender = '여'
      }else if (this.$store.state.userInfo.gender === "male") {
        this.gender = '남'
      }else {
        this.gender = null
      }
    },
    fetchPrivate () {
      if (this.$store.state.userInfo.private_user === true) {
        this.private_user = '비공개 계정입니다.'
      }else {
        this.private_user = null
      }
    }
  },
  created () {
    this.fetchGender(),
    this.fetchPrivate()
  },
  mounted () {
    this.isFollowers()
  }
}
</script>

<style>
.profile-wrap {
  display: flex;
  flex-direction: column;
  background: rgba(250, 250, 250);
  color: #2c3e50;
}
.profile-header{
  display: flex;
  width: 60%;
  margin: 50px auto;
}
.profile-img{
  flex: 1;
  margin-right: 50px;
  text-align: center;
}
.profile-img img {
  border-radius: 50%;
}
.profile-content{
  flex: 2;
}
.profile-content p {
  font-size: 30px;
  margin-bottom: 15px;
}
.profile-update-btn {
  margin: 0 20px;
  padding: 5px 15px;
  background: none;
  border: 1px solid rgb(177, 177, 177);
  border-radius: 4px;
  font-weight: bold;
}
.profile-update-btn a {
  color: rgb(44, 62, 80);
  text-decoration: none;
}
.profile-follow {
  margin-right: 35px;
}
.profile-follow-btn{
  margin: 0 20px;
  padding: 5px 15px;
  background: rgb(53, 150, 255);
  border: none;
  border-radius: 4px;
  color: rgba(255, 255, 255);
  font-weight: bold;
  cursor: pointer;
}
.unfollow-btn {
  border: 2px solid rgb(53, 150, 255);
  background: rgba(255, 255, 255);
  color: rgb(53, 150, 255);
}
.unfollow-btn:hover {
  background: rgb(53, 150, 255);
  color: rgba(255, 255, 255);
  transition: .3s;
}
.profile-follow-btn:focus{
  outline: none;
}
.profile-follow-cnt {
  font-weight: bold;
}
.profile-delete-btn {
  margin: 0 10px;
  padding: 5px 10px;
  background: none;
  border: 1px solid rgb(177, 177, 177);
  border-radius: 4px;
  font-size: 10px;
  color: rgb(165, 165, 165);
  cursor: pointer;
}
.profile-description {
  margin: 20px 0;
}
.profile-description small {
  margin-right: 20px;
}
.profile-description p{
  margin: 10px 0;
  font-size: 14px;
}
hr {
  width: 60%;
  margin: 0 auto;
  border: none;
  border-top:1px solid rgb(219, 219, 219);
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
  .profile-feed{
    flex: 25%;
    margin: 4%;
  }
  .profile-feed img{
    width: 100%;
  }
}
</style>
