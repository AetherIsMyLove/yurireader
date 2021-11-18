<template>
  <div class="container doctruyen " style="margin-top:20px">
  
 <div class="allimg">
 <div class="columns  is-centered">
   
  <div class="column is-half">
  <div class="block">
     <h2 class="title">{{mangatitle}}</h2>

  </div>

 <h3 class="subtitle">{{chaptitle}}</h3>

<div class="select">
  <select @change="changelink">
   <option v-for="chap in allchap" :key="chap.id" :value="chap.id">
    {{chap.name}}
   </option>
  </select>
</div>
  </div>
</div>

 <div class="img " v-for="(chap,index) in chapimg" :key="index">
    <img :data-src="chap" :src="chap" >

    
   </div>
 </div>
  
   
    
   </div>
  
</template>

<script>
export default {
  data(){
      return{
        chapimg:[],
        allchap:[],
        chaptitle:'',
        mangatitle:''
      }
  },
  methods:{
    changelink(event){
     console.log(event.target.value)
     window.location.href = `/doctruyen?id=${this.$route.query.id}&chapid=${event.target.value}`
    }
  },
  mounted(){
  
     fetch(`https://api.yurineko.net/manga/${this.$route.query.id}`)
     .then(res => {
       return(res.json())
     })
     .then(data => {
         this.allchap = data.chapters
        
     })
      fetch(`https://api.yurineko.net/read/${this.$route.query.id}/${this.$route.query.chapid}`)
      .then(res => {
          return(res.json())
      })
      .then(data => {
         this.chapimg = data.url
          this.chaptitle = data.chapterInfo.name
          this.mangatitle = data.mangaInfo.originalName
          console.log(data.mangaInfo.originalName)
         console.log(data.chapterInfo)
      })
      
    
  }

}
</script>

<style scoped>
.doctruyen{
  display: grid;
  grid-template-columns: 1fr 3fr 1fr
  }
.allimg{
 grid-column: 2;
}


</style>