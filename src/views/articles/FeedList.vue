<template>
  <div>
    <Feed :feed="feed" v-for="feed in $store.state.feeds" :key="feed.id"/>
  </div>
</template>

<script>
import Feed from '@/components/articles/Feed.vue'
import { mapActions } from 'vuex'


export default {
  name: 'List',
  components: {
    Feed,
  },
  methods: {
    ...mapActions(['fetchFeeds'])
  },
  created () {
    this.fetchFeeds()
  }
}
</script>

<style>

</style>
