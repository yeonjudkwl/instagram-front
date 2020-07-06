<template>
  <li>
    <span @click="fetchUserInfoPushProfile(cmt.user.username)" class="comment-user">{{ cmt.user.username}}</span>
    {{ cmt.content }}
    {{ cmt.like_users }}
    <i v-if="isLikeUser" @click="unlikeComment({ feedId:feed.id, commentId:cmt.id });isLike()" class="fas fa-heart heart-color"></i>
    <i v-else @click="likeComment({ feedId:feed.id, commentId:cmt.id });isLike()" class="far fa-heart"></i>
    <i v-if="$store.state.username === cmt.user.username" 
        @click="deleteComment({ feedId:feed.id, commentId:cmt.id })" 
        class="fas fa-times comment-delete" >
    </i>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'comment',
  props: {
    feed: Object,
    cmt: Object,
  },
  data () {
    return {
      isLikeUser: false,
    }
  },
  methods: {
    ...mapActions(['fetchUserInfoPushProfile', 'deleteComment', 'likeComment', 'unlikeComment']),
    isLikeUsers () {
      if (this.cmt.like_users) {
        this.cmt.like_users.forEach( data => {
          if (data.username === this.$store.state.username) {
            this.isLikeUser = true
          }
        })
      }
    },
    isLike () {
      this.isLikeUser = !this.isLikeUser
    }
  },
  created () {
    this.isLikeUsers()
  },
}
</script>

<style scoped>
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
