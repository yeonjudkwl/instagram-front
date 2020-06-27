<template>
  <div>
    <div class="profile-wrap">
      <div class="profile-header">
        <div class="profile-img">
          {{ $store.state.userInfo.profile_photo }}
        </div>
        <div class="profile-content">
          <p>
            {{ $store.state.userInfo.username }}
            <span v-if="isMyProfile">
              <button class="profile-update-btn">프로필 편집</button>
            </span>
            <span v-else>
              <button class="profile-follow-btn">팔로우</button>
            </span>
          </p>
          <span class="profile-follow">팔로워 <span class="profile-follow-cnt">{{ $store.state.userInfo.followers_count }}</span></span>
          <span class="profile-follow">팔로우 <span class="profile-follow-cnt">{{ $store.state.userInfo.following_count }}</span></span>
          <small>{{ $store.state.userInfo.name }}</small>
        </div>
      </div>
      <hr>
      <div class="profile-feeds">

      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Profile',
  computed: {
    isMyProfile () {
      return this.$store.state.userInfo.username == this.$store.state.username
    }
  }
}
</script>

<style>
.profile-wrap {
  height: 80vh;
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
