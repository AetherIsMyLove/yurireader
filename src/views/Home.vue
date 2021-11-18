
<template>

  <div class="home container is-widescreen">
    <div class="randomCaption">
      <h4 class="title is-4" style="margin-top: 20px; color: pink">
        Random Yuri
      </h4>
      <hr />
    </div>
    <div class="latest yurilatest container is-widescreen">
      <div v-for="last in latest" :key="last.id">
        <div class="card" style="border: 3px solid pink">
          <div class="card-image">
            <figure class="image">
              <img :src="last.thumbnail" alt="Placeholder image"/>
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h4 class="is-capitalized">
                <router-link
                  :to="{ path: 'manga', query: { id: last.id } }"
                  v-if="last.originalName.length < 15"
                >
                  {{ last.originalName }}</router-link
                >
                <router-link
                  :to="{ path: 'manga', query: { id: last.id } }"
                  v-if="last.originalName.length >= 15"
                  >{{ last.originalName.substring(0, 30) + "..." }}</router-link
                >
              </h4>
              <h6 class="subtitle">{{ last.lastChapter.name }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="randomCaption container is-widescreen">
      <h4 class="title is-4" style="margin-top: 20px; color: pink">
        Yuri List
      </h4>
      <hr />

      <div class="latest yurilatest container is-widescreen" id="newyuri" >
        <div v-for="yuri in yuriLatest" :key="yuri.id">
          <div class="card" style="margin-top: 20px; border: 3px solid pink">
            <div class="card-image">
              <figure class="image">
                <img :src="yuri.thumbnail" alt="Placeholder image" loading="lazy"/>
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h4 class="is-capitalized">
                  <router-link
                    :to="{ path: 'manga', query: { id: yuri.id } }"
                    >{{
                      yuri.originalName.substring(0, 30) + "..."
                    }}</router-link
                  >
                </h4>
                <h6 class="subtitle" v-if="yuri.lastChapter != null">
                  {{ yuri.lastChapter.name }}
                </h6>
                <h6 class="subtitle" v-if="yuri.lastChapter === null">
                  Sắp ra mắt
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
         <p class="pagination is-centered" v-if="this.$route.query.page === undefined">You are in page 1</p>
         <p class="pagination is-centered" v-if="this.$route.query.page != undefined">You are in page {{this.$route.query.page}}</p>

      <nav class="pagination is-centered" style="margin-top:20px" role="navigation" aria-label="pagination">
  

  <ul class="pagination-list">
   <li v-for="(total,index) in totalPage" :key="index">
   
    <router-link :to="{path:'/',query:{page:total}}" class="pagination-link button" :class="isActived" v-if="total != '...'" aria-label="Page 46" aria-current="page" @click="getNew(total)">{{total}}</router-link>
    <p v-if="total === '...'">...</p>
   </li>
  </ul>
</nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latest: [],
      totalPage: "",
      yuriLatest: [],
      page:'page',
      disabled:true,
      isActived:''
    };
  },
 
  methods: {
    getLatest() {
      console.log(this.$route.query.page)
      let a = 1
      if( a < 2){
         fetch("https://api.yurineko.net/random?page=1")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.latest[0] = data[0];
          this.latest[1] = data[1];
          this.latest[2] = data[2];

          this.latest[3] = data[3];
        });
      }
     
    },
    
    pagination(c, m) {
      var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

      for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
          range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push("...");
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    },
    getNew(i){
      if(i === "..."){
        console.log('Do Nothing')
      }
      if(i == 1){
        this.disabled = true
      }
      else{
        this.disabled = false
      }
      
     
      fetch(`https://api.yurineko.net/lastest2?page=${i}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        console.log()
        console.log()
        let page = this.$route.query.page
        console.log(page)
      let allpage = Math.floor(data.resultCount / 20)
        console.log()
        this.totalPage = this.pagination(parseInt(page),allpage)
        this.yuriLatest = data.result;
      });
    }
  },
  
    
  mounted() {
  
    this.getLatest();
    if(!this.$route.query.page){
      this.disabled = true
fetch("https://api.yurineko.net/lastest2?page=1")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.totalPage = this.pagination(1, Math.floor(data.resultCount / 20));

        this.yuriLatest = data.result;
      });
    }
    else{
      if(this.$route.query.page == 1) {
        this.disabled = true
      }
      if(this.$route.query.page > 1){
        this.disabled = false
      }
      fetch(`https://api.yurineko.net/lastest2?page=${this.$route.query.page}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        console.log()
        console.log()
        let page = this.$route.query.page
        console.log(page)
      let allpage = Math.floor(data.resultCount / 20)
        console.log()
        this.totalPage = this.pagination(parseInt(page),allpage)
        this.yuriLatest = data.result;
      });
    }
    
      console.log(this.$route.query.page)
  },
};
</script>

<style scoped>
.yurilatest {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
}
@media screen and (max-width: 700px) {
  .yurilatest {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
  }
}

.latest .card {
  max-width: 200px;
  
}
.latest {
  margin-top: 30px;
}
figure {
  border-radius: 10%;
}
.card {
  background: rgba(238, 243, 246, 0.5) !important;
}
#btnnext{
 background: transparent;
}
</style>
