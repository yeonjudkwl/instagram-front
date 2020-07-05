<template>
  <div class="feed-update-wrap">
    <div class="feed-update">
      <div class="feed-update-content">
        <img :src="$route.params.img" alt="feed-img">
        <label for="content" class="a11y-hidden">content: </label>
        <input @keypress.enter="updateFeed(updateData)" v-model="updateData.content" type="text" id="content" placeholder="내용을 입력하세요">
      </div>
      <button class="feed-update-btn" @click="updateFeed(updateData)"><i class="fas fa-cloud-upload-alt fa-2x"></i></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FeedUpdate',
  data () {
    return {
      updateData: {
        feedId: this.$route.params.id,
        content: null,
      }
    }
  },
  methods: {
    ...mapActions(['updateFeed'])
  }
}
</script>

<style scoped>
.feed-update-wrap{
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(250, 250, 250);
  text-align: center;
  color: #2c3e50;
}
.feed-update {
  width: 450px;
  height: 500px;
  margin-top: 50px;
  background: rgba(255, 255, 255, .8);
  border: 5px solid rgba(255, 255, 255);
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
  position: relative;
}
.feed-update-content img {
  width: 90%;
}
.feed-update-content input{
  width: 90%;
  margin: 10px 0;
  padding: 10px;
  line-height: 1.5;
  background: rgba(250, 250, 250);
  border: 1px solid rgb(182, 181, 181);
  border-radius: 5px;
}
.feed-update-content input:focus {
  outline: none;
}
.feed-update-btn {
  border:none;
  background: none;
  position: absolute;
  bottom: 0;
  cursor: pointer;
}
.feed-update-btn:focus{
  outline: none;
}
.feed-update-btn i{
  color: rgba(90, 170, 255);
}
.feed-update-btn i:hover{
  transform: scale(1.3);
  color: rgb(53, 150, 255);
}
</style>
