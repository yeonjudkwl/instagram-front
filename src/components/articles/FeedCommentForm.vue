<template>
  <div class="comment-form">
    <!-- <label for="contentComment" class="a11y-hidden">comment: </label> -->
    <!-- id="contentComment" -->
    <input @keypress.enter="createComments(commentData);resetContent()" v-model="commentData.content" type="text" class="comment"  placeholder="댓글달기">
    <button @click="createComments(commentData);resetContent()" class="comment-btn">게시</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FeedCommentForm',
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
    ...mapActions(['createComments']),
    resetContent () {
      this.commentData.content = null
    }
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
</style>
