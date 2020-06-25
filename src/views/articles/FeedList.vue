<template>
  <div>
    <Feed :feed="feed" v-for="feed in feeds" :key="feed.id"/>
  </div>
</template>

<script>
import Feed from '@/components/articles/Feed.vue'
import axios from 'axios'
import SERVER from '@/api/drf'

export default {
  name: 'List',
  components: {
    Feed,
  },
  data () {
    return {
      feeds: null,
    }
  },
  methods: {
    fetchFeeds () {
      axios.get(SERVER.URL + SERVER.ROUTES.feeds) 
      .then(res => {
        this.feeds = res.data
      }) 
      .catch(err => { console.log(err.response.data) });
    }
  },
  created () {
    this.fetchFeeds()
  }
}
</script>

<style>

</style>
