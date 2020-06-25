<template>
  <div>
    <!-- <h1>feed</h1> -->
    <p>{{ feed.id }}: {{ feed. content }}</p>
    <img :src="url" alt="" width="100px">
    <hr>
  </div>
</template>

<script>
import SERVER from '@/api/drf'

export default {
  name: 'Feed',
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

<style>

</style>
