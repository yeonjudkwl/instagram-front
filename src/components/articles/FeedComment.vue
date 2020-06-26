<template>
  <form action="" class="comment-form">
    <label for="contentComment" class="a11y-hidden">comment: </label>
    <input type="text" class="comment" id="contentComment" placeholder="댓글달기">
    <button class="comment-btn">게시</button>
  </form>
</template>

<script>
export default {
 name: 'FeedComment',
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
