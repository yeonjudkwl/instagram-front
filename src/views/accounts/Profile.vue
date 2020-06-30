<template>
  <div>
    <div class="profile-wrap">
      <div class="profile-header">
        <div class="profile-img">
          {{ $store.state.userInfo.profile_photo }}
          {{$store.state.username}}
        </div>
        <div class="profile-content">
          <p>
            {{ $store.state.userInfo.username }}
            <span v-if="isMyProfile">
              <button class="profile-update-btn">프로필 편집</button>
            </span>
            <span v-else>
              <button v-if="isFollower" @click="unfollow($store.state.userInfo.username)" class="profile-follow-btn unfollow-btn">언팔로우</button>
              <button v-else @click="follow($store.state.userInfo.username)" class="profile-follow-btn">팔로우</button>
            </span>
          </p>
          <span class="profile-follow">팔로워 <span class="profile-follow-cnt">{{ $store.state.userInfo.followers_count }}</span></span>
          <span class="profile-follow">팔로우 <span class="profile-follow-cnt">{{ $store.state.userInfo.following_count }}</span></span>
          <small>{{ $store.state.userInfo.name }}</small>
        </div>
      </div>
      <hr>
      <div class="profile-feeds">
        <div class="profile-feed">
          <img src="@/assets/logo.png" alt="">
        </div>
        <div class="profile-feed">
          <img src="@/assets/logo.png" alt="">
        </div>
        <div class="profile-feed">
          <img src="@/assets/logo.png" alt="">
        </div>
        <div class="profile-feed">
          <img src="@/assets/logo.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      isFollower: false,
    }
  },
  computed: {
    isMyProfile () {
      return this.$store.state.userInfo.username === this.$store.state.username
    },
  },
  methods: {
    ...mapActions(['follow', 'unfollow']),
    isFollowers () {
      if (this.$store.state.userInfo.followers) {
        this.$store.state.userInfo.followers.forEach( data => {
          if (data.username === this.$store.state.username) {
            this.isFollower = true
          }
        })
      }
    }
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
  width: 70%;
  margin: 50px auto 100px;;
}
.profile-img{
  flex: 1;
  margin-right: 50px;
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
hr {
  width: 70%;
  margin: 0 auto;
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
