<template>
  <div class="feed-create-wrap">
    <div class="feed-create">
      <h2 class="feed-create-title">Feed Upload</h2>
      <div class="feed-create-content">
        <label for="content" class="a11y-hidden">content: </label>
        <input v-model="feedData.content" type="text" id="content" placeholder="내용을 입력하세요">
      </div>
      <div class="feed-create-file">
        <label for="image" class="a11y-hidden">image: </label>
        <input type="file" ref="feedimage" @change="fetchFile" id="image">
      </div>
      <p v-if="message" class="feed-error-msg">{{ message }}</p>
      <button class="feed-create-btn" @click="checkFeedData()"><i class="fas fa-cloud-upload-alt fa-2x"></i></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FeedCreate',
  data () {
    return {
        feedData: {
          content: null,
          file: null,
        },
        message: null,
    }
  },
  methods: {
    ...mapActions(['create']),
    fetchFile () {
      this.feedData.file = this.$refs.feedimage.files[0]
    },
    checkFeedData () {
      if (this.feedData.content === null || this.feedData.file === null) {
        this.message = '필수값을 입력해주세요 :)'
      } else {
        this.create(this.feedData)
      }
    }
  },
}
</script>

<style scoped>
.feed-create-wrap{
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(250, 250, 250);
  text-align: center;
  color: #2c3e50;
}
.feed-create {
  width: 450px;
  height: 500px;
  margin-top: 50px;
  background: rgba(255, 255, 255, .8);
  border: 5px solid rgba(255, 255, 255);
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
  position: relative;
}
.feed-create-title {
  margin: 30px 0;
  font-style: italic;
}
.feed-create-content input{
  width: 90%;
  margin: 10px 0;
  padding: 10px;
  line-height: 1.5;
  background: rgba(250, 250, 250);
  border: 1px solid rgb(182, 181, 181);
  border-radius: 5px;
}
.feed-create-content input:focus {
  outline: none;
}
.feed-create-file input{
  width: 90%;
  margin: 10px 0;
}
.feed-create-btn {
  border:none;
  background: none;
  position: absolute;
  bottom: 50px;
  cursor: pointer;
}
.feed-create-btn i{
  color: rgba(90, 170, 255);
}
.feed-create-btn i:hover{
  transform: scale(1.3);
  color: rgb(53, 150, 255);
}
.feed-error-msg {
  width: 90%;
  margin: 0 auto;
  padding: 5px 0;
  background:rgb(255, 243, 205);
}
</style>
