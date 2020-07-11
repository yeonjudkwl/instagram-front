<template>
  <div class="logos">
    <div class="logos-left">
      <i
        v-if="isLikeUser"
        @click="unlike(feed.id);isLike()"
        class="logo-img fas fa-heart heart-color"
      ></i>
      <i v-else @click="like(feed.id);isLike()" class="logo-img far fa-heart"></i>
      <router-link :to="{ name: 'FeedDetail', params: { id: feed.id } }">
        <i class="logo-img far fa-comment"></i>
      </router-link>
      <!-- <svg aria-label="Direct"  class="_8-yf5" fill="#262626" height="23" viewBox="-10 -13 48 48" width="23">
        <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
      </svg>-->
    </div>
    <div class="logos-right">
      <i class="logo-img far fa-bookmark"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FeedLogo",
  props: {
    feed: Object
  },
  data() {
    return {
      isLikeUser: false
    };
  },
  methods: {
    ...mapActions(["like", "unlike"]),
    isLikeUsers() {
      if (this.feed.like_users) {
        this.feed.like_users.forEach(data => {
          if (data.username === this.$store.state.username) {
            this.isLikeUser = true;
          }
        });
      }
    },
    isLike() {
      this.isLikeUser = !this.isLikeUser;
    }
  },
  created() {
    this.isLikeUsers();
  }
};
</script>

<style>
.logos {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.logo-img {
  padding: 10px;
  transform: scale(1.5);
  cursor: pointer;
}
.heart-color {
  color: crimson;
}
.logos-left a {
  color: rgb(44, 62, 80);
}
</style>
