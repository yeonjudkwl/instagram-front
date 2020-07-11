<template>
  <ul>
    <li v-for="result in $store.state.searched" :key="result.id">
      <div class="li-wrap">
        <div class="li-img"> 
          <img :src="'http://127.0.0.1:8000'+result.profile_photo" alt="profile">
        </div>
        <div class="li-content">
          <p>{{ result.username }}</p>
          <p v-if="result.name" >{{ result.name }}</p>
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
  margin: 50px auto;
  border: 1px solid rgb(208, 208, 208);
  border-radius: 4px;
  list-style-type: none;
}
.li-wrap {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid rgb(208, 208, 208);
}
.li-img {
  margin: 0 20px;
  margin-right: 50px;
}
.li-img img {
  width: 80px;
  border-radius: 50%;
}
.li-content {
  width: 20%;
  display:flex;
  flex-direction: column;
  justify-content: center;
}
.li-content p:first-child {
  font-weight: bold;
  margin-bottom: 5px;
}
.li-content p:last-child {
  color: rgb(148, 148, 148);
}
@media screen and (max-width: 768px) {
  ul {
    width: 300px;
  }
  .li-img {
  margin-right: 20px;
}
}
</style>
