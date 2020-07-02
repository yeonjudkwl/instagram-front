<template>
  <div>
    <h2>Profile Update</h2>
    <div>
      <label for="image" class="a11y-hidden">image: </label>
      <input type="file" ref="feedimage" @change="fetchFile" id="image">
    </div>
    <div>
      <label for="name" class="a11y-hidden">name: </label>
      <input v-model="profileData.name" type="text" id="name" placeholder="이름을 입력하세요">
    </div>
    <div>
      <label for="gender" class="a11y-hidden">gender: </label>
      <input v-model="profileData.gender" type="radio" name="gender" id="gender" value="male">남
      <input v-model="profileData.gender" type="radio" name="gender" id="gender" value="female">여
    </div>
    <div>
      <label for="description" class="a11y-hidden">description: </label>
      <input v-model="profileData.description" type="text" id="description" placeholder="본인을 소개하세요">
    </div>
    <button @click="updateUserInfo({username: $store.state.username, profileData: profileData})"><i class="fas fa-cloud-upload-alt fa-2x"></i></button>
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
        }
    }
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    fetchFile () {
      this.profileData.file = this.$refs.feedimage.files[0]
    }
  },
}
</script>

<style>

</style>
