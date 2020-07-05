<template>
  <div>
    <ul class="comment-body">
      <li v-for="comment in feed.comments" :key="comment.id">
        <span @click="fetchUserInfoPushProfile(comment.user.username)" class="comment-user">{{ comment.user.username}}</span>
        {{ comment.content }}
        <i v-if="$store.state.username === comment.user.username" 
           @click="deleteComment({ feedId:feed.id, commentId:comment.id })" 
           class="fas fa-times comment-delete" >
        </i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FeedComment',
  props: {
    feed: Object,
  },
  methods: {
    ...mapActions(['fetchUserInfoPushProfile', 'deleteComment']),
  },
}
</script>

<style scoped>
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
