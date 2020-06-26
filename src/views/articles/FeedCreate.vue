<template>
  <div>
    <input v-model="feedData.content" type="text"><br>
    <input type="file" ref="feedimage" @change="fetchFile"><br>
    <button @click="create(feedData)">upload</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FeedCreate',
  data () {
    return {
        feedData: {
          content: null,
          file: null,
        }
    }
  },
  methods: {
    ...mapActions(['create']),
    fetchFile () {
      this.feedData.file = this.$refs.feedimage.files[0]
    }
  },
}
</script>

<style>

</style>
