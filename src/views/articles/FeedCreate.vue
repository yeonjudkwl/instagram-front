<template>
  <div>
    <div>
      <label for="content" class="a11y-hidden">content: </label>
      <input v-model="feedData.content" type="text" id="content">
    </div>
    <div>
      <label for="image" class="a11y-hidden">image: </label>
      <input type="file" ref="feedimage" @change="fetchFile" id="image">
    </div>
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
