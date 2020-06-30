<template>
  <div>
    <ul class="comment-body">
      <li v-for="comment in feed.comments" :key="comment.id">
        <span @click="fetchUserInfo(comment.user.username)" class="comment-user">{{ comment.user.username}}</span>
        {{ comment.content }}
        <i v-if="$store.state.username === comment.user.username" class="fas fa-times comment-delete"></i>
      </li>
    </ul>
    <div class="comment-form">
      <!-- <label for="contentComment" class="a11y-hidden">comment: </label> -->
      <!-- id="contentComment" -->
      <input @keypress.enter="createComments(commentData)" v-model="commentData.content" type="text" class="comment"  placeholder="댓글달기">
      <button @click="createComments(commentData)" class="comment-btn">게시</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FeedComment',
  props: {
    feed: Object,
  },
  data () {
    return {
      commentData: {
        feedId: this.feed.id,
        content: null,
      },
    }
  },
  methods: {
    ...mapActions(['createComments', 'fetchUserInfo']),
  },
}
</script>

<style scoped>
.comment-form{
  position: relative;
}
.comment{
  width: 100%;
  height: 45px;
  padding: 5px;
  border: none;
  border-top: 1px solid #DBDBDB;
  color: #999999;
  font-size: 0.8em;
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
.comment-body {
  list-style-type: none;
  font-size: 14px;
}
.comment-body li {
  margin: 5px;
  position: relative;
}
.comment-user {
  margin-right: 8px;
  font-weight: bold;
  cursor: pointer;
}
.comment-delete {
  position: absolute;
  top: 0px;
  right: 15px;
  color: rgb(138, 138, 138);
  cursor: pointer;
}
</style>
