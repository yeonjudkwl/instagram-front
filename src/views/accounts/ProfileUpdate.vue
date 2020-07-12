<template>
  <div class="profile-update-wrap">
    <div class="profile-update">
      <h2 class="profile-update-title">Profile Update</h2>
      <div class="profile-update-file">
        <label for="image" class="a11y-hidden">image: </label>
        <input type="file" ref="feedimage" @change="fetchFile" id="image">
      </div>
      <div class="profile-update-content">
        <label for="name" class="a11y-hidden">name: </label>
        <input v-model="profileData.name" type="text" id="name" placeholder="이름을 입력하세요">
      </div>
      <div>
        <label for="male" >남 </label>
        <input v-model="profileData.gender" type="radio" name="gender" id="male" value="male">
      </div>
      <div>
        <label for="female" >여 </label>
        <input v-model="profileData.gender" type="radio" name="gender" id="female" value="female">
      </div>
      <div class="profile-update-content">
        <label for="description" class="a11y-hidden">description: </label>
        <input v-model="profileData.description" type="text" id="description" placeholder="본인을 소개하세요">
      </div>
      <div>
        <label for="false" >공개 </label>
        <input v-model="profileData.is_private" type="radio" name="private" id="false" value="false">
      </div>
      <div>
        <label for="true" >비공개 </label>
        <input v-model="profileData.is_private" type="radio" name="private" id="true" value="true">
      </div>
      <p v-if="message" class="error-msg">{{ message }}</p>
      <button class="profile-update-btn" @click="checkData"><i class="fas fa-cloud-upload-alt fa-2x"></i></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProfileUpdate',
  data () {
    return {
      profileData: {
        file: null,
        name: null,
        gender: null,
        description: null,
        is_private: null,
      },
        message: null,
    }
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    fetchFile () {
      this.profileData.file = this.$refs.feedimage.files[0]
    },
    checkData () {
      if (this.profileData.file === null || this.profileData.gender === null || this.profileData.is_private === null) {
        this.message = '필수값을 입력해주세요 :)'
      } else {
        this.message = null
        this.updateUserInfo({username: this.$store.state.username, profileData: this.profileData})
      }
    }
  },
}
</script>

<style scoped>
.profile-update-wrap{
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(250, 250, 250);
  text-align: center;
  color: #2c3e50;
}
.profile-update {
  width: 450px;
  height: 500px;
  margin-top: 50px;
  background: rgba(255, 255, 255, .8);
  border: 5px solid rgba(255, 255, 255);
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
  position: relative;
}
.profile-update-title {
  margin: 30px 0;
  font-style: italic;
}
.profile-update-content input{
  width: 90%;
  margin: 10px 0;
  padding: 10px;
  line-height: 1.5;
  background: rgba(250, 250, 250);
  border: 1px solid rgb(182, 181, 181);
  border-radius: 5px;
}
.profile-update-content input:focus {
  outline: none;
}
.profile-update-file input{
  width: 90%;
  margin: 10px 0;
}
.profile-update-btn {
  border:none;
  background: none;
  position: absolute;
  right: 35%;
  bottom: 50px;
  cursor: pointer;
}
.profile-update-btn i{
  color: rgba(90, 170, 255);
}
.profile-update-btn i:hover{
  transform: scale(1.3);
  color: rgb(53, 150, 255);
}
.error-msg {
  width: 90%;
  margin: 0 auto;
  padding: 5px 0;
  font-size: 10px;
  background:rgb(255, 243, 205);
}
</style>
