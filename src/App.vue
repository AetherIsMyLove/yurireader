<template>
  <Navbar/>
  

   <router-view/>

<Footer></Footer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

*{
 margin: 0;
 padding: 0;
font-family: 'Poppins', sans-serif; box-sizing: border-box;
   scroll-behavior: smooth;

}
input:focus{
 color:white
}
</style>
<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  components:{
    Navbar,
    Footer
  }
}
</script>