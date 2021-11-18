<template>
  <div class="container is-max-desktop" style="margin-top:20px">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image">
            <img :src="thumbnail" alt="Image" />
          </figure>
        </div>
        <div class="media-content">
          <span class="content">
            <span id="makefont">Title:</span> {{ title }}
          </span>
          <div class="media-content">
            <span class="content">
              <span id="makefont">Tên Khác:</span> {{ othername }}
            </span>
          </div>
          <div class="media-content">
            <span class="content">
              <span id="makefont">Team:</span> {{ team }}
            </span>
          </div>
          <div class="media-content">
            <span class="content">
              <span id="makefont">Tác Giả:</span> {{ author }}
            </span>
          </div>
          <div class="media-content">
            <span id="makefont">Tags:</span>
            <span class="content">
              <div class="tags">
                <span class="tag" v-for="tag in tags" :key="tag.id">{{
                  tag.name
                }}</span>
              </div>
            </span>
          </div>
         
        </div>
      </article>
    </div>
    <div class="media-content">
      <span class="content">
        <span id="makefont">All Chapter:</span>
      </span>

    </div>
    <div id="scrollbox">
      <div class="box" v-for="chap in chapter" :key="chap.id">
        <span>
          <router-link
            :to="{
              path: '/doctruyen',
              query: { id: this.$route.query.id, chapid: chap.id },
            }"
            >{{ chap.name }}</router-link
          ></span
        >
      </div>
    </div>

    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      thumbnail: "",
      title: "",
      othername: "",
      description: "",
      team: "",
      author: "",
      tags: [],
      chapter: [],
    };
  },

  mounted() {
    fetch(`https://api.yurineko.net/manga/${this.$route.query.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.thumbnail = data.thumbnail;
        this.title = data.originalName;
        this.team = data.team[0].name;
        this.author = data.author[0].name;
        this.tags = data.tag;
        let chap = data.chapters;
        /* chap.forEach(elem => {
       
       function getDay(day){
 return Math.floor((Date.now() - new Date(day)) * 1.15740741  * Math.pow(10,-8))
}
    if(Math.floor(getDay(elem.date)/30) < 1){
      if(getDay(elem.date) < 1){
      elem.date =  "Hôm Nay"

      }
      else{
        elem.date = Math.floor(getDay(elem.date)) + " ngày trước "
      }
    }
    if((Math.floor(getDay(elem.date)/30) >=1 && (Math.floor(getDay(elem.date)/30) <12))){
      elem.date = Math.floor(getDay(elem.date)/30) + " tháng trước"
    } 
    else{
      elem.date =  Math.floor(getDay(elem.date)/30/12) + " năm trước"
    }
    
   
     })*/
        console.log(chap);
        this.chapter = chap;
        if (data.otherName === "") {
          this.othername = "Đang Cập Nhật";
        } else {
          this.othername = data.otherName;
        }

        if (data.description === "") {
          this.description = "Đang Cập Nhật";
        } else {
          this.description = data.description;
        }
        console.log(this.othername);
      });
  },
};
</script>

<style scoped>
figure {
  max-width: 200px;
}
#makefont {
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
}
#scrollbox {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
