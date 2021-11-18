<template>
<div class="container is-max-desktop" style="margin-top:20px">
 <div class="box" v-for="(res,index) in result" :key="index">
<router-link :to="{path:'/manga',query:{id:res.id}}">
 <article class="media">
    <div class="media-left">
      <figure class="image">
        <img :src="res.thumbnail" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        
         <h3 class="title"> <strong>{{res.originalName}}</strong> </h3>
          <br>
          <span v-html="res.description"></span>
         
        
      </div>
      
    </div>
  </article>
</router-link>
  
</div>

</div>
</template>

<script>
export default {
 data(){
     return{
      result:[]
     }
 },
 mounted(){
  fetch(`https://api.yurineko.net/search?query=${this.$route.query.query}&page=1`)
  .then(res => {
      return(res.json())
  })
  .then(data => {
      console.log(data)
      this.result = data.result
  })
 }
}
</script>

<style scoped>

figure{
 max-width: 200px;
}
</style>