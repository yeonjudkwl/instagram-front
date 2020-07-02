<template>
  <div>
    <div>
      <label for="content" class="a11y-hidden">content: </label>
      <input v-model="updateData.content" type="text" id="content" placeholder="내용을 입력하세요">
    </div>
    <button @click="updateFeed(updateData)"><i class="fas fa-cloud-upload-alt fa-2x"></i></button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FeedUpdate',
  data () {
    return {
      updateData: {
        feedId: this.$route.params.id,
        content: null,
      }
    }
  },
  methods: {
    ...mapActions(['updateFeed'])
  }
}
</script>

<style>

</style>
