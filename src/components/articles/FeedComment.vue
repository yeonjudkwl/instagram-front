<template>
  <div>
    <ul class="comment-body">
      <comment :cmt="cmt" :feed="feed" v-for="cmt in feed.comments" :key="cmt.id"/>
    </ul>
  </div>
</template>

<script>
import SERVER from '@/api/drf'
import axios from 'axios'
import comment from '@/components/articles/comment.vue'

export default {
  name: 'FeedComment',
  components: {
    comment,
  },
  props: {
    feed: Object,
  },
  data () {
    return {
      comments: null,
    }
  },
  methods: {
    fetchComments () {
      axios.get(SERVER.URL + `/articles/${this.feed.id}/comments/`)
        .then ( res => {
          this.comments = res.data
        })
        .catch(err => console.log(err.response.data))
    },
  },
  created () {
    this.fetchComments()
  },
  updated () {
    // this.fetchComments()
  }
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
</style>
