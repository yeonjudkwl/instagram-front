<template>
  <div class="con_wrap">
    <div class="conA">
      <Feed class="con" :feed="feed" v-for="feed in $store.state.feeds" :key="feed.id"/>
    </div>
    <div class="conB">
        
    </div>
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

<style scoped>
.con_wrap{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
  padding: 0 290px;
}
.conA{
  flex: 2;
  margin: 10px 0;
}
.conA .con{
  width: 600px;
  margin-bottom: 50px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  background-color: #ffffff;
}
.conB{
  flex: 1;
  position: sticky;
  top: 50px;
}
@media screen and (max-width: 1000px) {
  .conB{
    display: none;
  }
}
</style>
