<template>
  <div>
    <input v-model="content" type="text"><br>
    <input type="file" ref="feedimage"><br>
    <button @click="create">upload</button>
  </div>
</template>

<script>
import axios from 'axios'
import SERVER from '@/api/drf'

export default {
  name: 'FeedCreate',
  data () {
    return {
        content: null,
    }
  },
  computed: {
    file () {
      return this.$refs.feedimage.files[0]
    }
  },
  methods: {
    create () {
      const formdata = new FormData()
      formdata.append('content', this.content)
      formdata.append('image', this.file)

      const config = {
        headers: {
          Authorization: `Token ${this.$cookies.get('auth-token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(SERVER.URL + SERVER.ROUTES.feeds, formdata, config) 
        .then( () => { 
          this.$router.push({ name: 'FeedList' })
        }) 
        .catch(err => { console.log('사진업로드 실패', err) });
    }
  }
}
</script>

<style>

</style>
