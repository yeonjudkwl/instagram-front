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
              <button v-if="isFollower" @click="unfollow($store.state.userInfo.username)" class="profile-follow-btn unfollow-btn">언팔로우</button>
              <button v-else @click="follow($store.state.userInfo.username)" class="profile-follow-btn">팔로우</button>
            </span>
          </p>
          <span class="profile-follow">팔로워 <span class="profile-follow-cnt">{{ $store.state.userInfo.followers_count }}</span></span>
          <span class="profile-follow">팔로우 <span class="profile-follow-cnt">{{ $store.state.userInfo.following_count }}</span></span>
          <small>{{ $store.state.userInfo.name }}</small><small>{{ this.gender }}</small>
          <p>{{ $store.state.userInfo.description }}</p>
          <span v-if="isMyProfile">
            <button @click="deleteUserInfo($store.state.userInfo.username)">회원 탈퇴</button>
          </span>
        </div>
      </div>
      <hr>
      <MyFeed />
    </div>
  </div>
</template>

<script>
import SERVER from '@/api/drf'
import MyFeed from '@/components/articles/MyFeed.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',
  components: {
    MyFeed,
  },
  data () {
    return {
      isFollower: false,
      gender: null,
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
    fetchGender () {
      if (this.$store.state.userInfo.gender === "female") {
        this.gender = '여'
      }else if (this.$store.state.userInfo.gender === "male") {
        this.gender = '남'
      }else {
        this.gender = null
      }
    },
  },
  created () {
    this.fetchGender()
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
</style>
