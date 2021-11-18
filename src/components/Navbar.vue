<template>
   <div id="nav">
    <router-link to="/"><h1>Yuri4Lifes</h1></router-link>
 
   <div class="field has-addons search__bar" >
  <div class="control">
       <input class="input" type="text" v-model="timkiem" placeholder="Search The Comics">

  
  </div>
  <div class="control">
  <router-link class="button is-info" :to="{path:'search',query:{query:timkiem}}">Search</router-link>
    
      
  </div>
 

</div>
  </div>
  
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return{
      timkiem:''
    }
  }
}
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
#nav{
 width: 100vw;
 background-color:  rgb(243,128,143);
 padding: 15px;
 display: grid;
 grid-template-columns: repeat(8ss,1fr);
}
a{
 text-decoration: none;
 color: white;
}
a:nth-child(1){
 grid-column: 2;
}
h1{
 font-size: 30px;
}
.search__bar{
 grid-column: 8;
}
.button,.input{
 background-color: transparent!important;
 border: 1px solid pink;
}
::placeholder {
  color: white;
}
</style>
