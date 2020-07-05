<template>
  <div>
    <img :src="url" alt="feed-image" class="con_img">
  </div>
</template>

<script>
import SERVER from '@/api/drf'

export default {
  name: 'FeedImg',
  props: {
    feed: Object,
  },
  computed: {
    url () {
      const img = this.feed.images[0].image
      return SERVER.URL + img
    }
  },
}
</script>

<style scoped>
.con_img{
  width: 100%;
}
</style>
