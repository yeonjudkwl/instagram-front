<template>
  <div class="feed-list-wrap">
    <div class="feed-list">
      <Feed class="feed" :feed="feed" v-for="feed in $store.state.feeds" :key="feed.id"/>
    </div>
    <div class="sub-feed">
        
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
.feed-list-wrap{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
  padding: 0 23%;
}
.feed-list{
  flex: 2;
  margin: 10px 0;
}
.feed-list .feed{
  width: 600px;
  margin-bottom: 50px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  background-color: #ffffff;
}
.sub-feed{
  flex: 1;
  position: sticky;
  top: 50px;
}
@media screen and (max-width: 1000px) {
  .sub-feed{
    display: none;
  }
}
@media screen and (max-width: 700px) {
  .feed-list .feed{
      margin: 0 auto 50px;
      width: 450px;
  }
}
</style>
