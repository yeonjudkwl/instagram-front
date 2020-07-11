<template>
  <ul>
    <li v-for="result in $store.state.searched" :key="result.id">
      <div class="li-wrap">
        <div class="li-img"> 
          <img :src="'http://127.0.0.1:8000'+result.profile_photo" alt="profile">
        </div>
        <div class="li-content">
          <div>{{ result.username }}</div>
          <div v-if="result.name" >{{ result.name }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
 name: 'Search.vue',
}
</script>

<style scoped>
ul {
  width: 40%;
  margin: 0 auto;
  border: 1px solid gray;
  border-radius: 4px;
  list-style-type: none;
}
.li-wrap {
  display: flex;
  justify-content: center;
}
.li-img {
  margin-right: 50px;
}
.li-img img {
  width: 80px;
}
.li-content {
  width: 20%;
}
</style>
