<template>
	<div>
    <div class="tab-list" v-show="movieList.length > 0">
      <div class="tab-list-title">影院热映</div>
      <div class="more" @click="toMoviemore()">更多</div>
      <div class="movieList">
        <div v-for="item in movieList" @click="toMovieDetail(item.id)">
          <img :src="item.images.small">
          <div class="title">{{item.title}}</div>
          <star :averages='item.rating.average' :isShow='isShow' class="star"></star>
        </div>
      </div>
    </div>

    <div class="tab-list" v-show="movieSoonList.length > 0">
      <div class="tab-list-title">院线即将上映</div>
      <div class="more" @click="toMovieshow()">更多</div>
      <div class="movieList">
        <div v-for="item in movieSoonList" @click="toMovieDetail(item.id)">
          <img :src="item.images.small">
          <div class="title">{{item.title}}</div>
          <star v-if="item.rating.average != 0" :averages='item.rating.average' :isShow='isShow' class="star"></star>
          <div v-if="item.rating.average == 0" class="not_show">即将上映</div>
        </div>
      </div>
    </div>

    <div class="tab-list" v-show="movieList.length > 0">
      <div class="tab-list-title">精选榜单</div>
      <div class="rankList">
        <div class="topOne" @click="toRank(0)">
          <div class="topOneTitle_f">豆瓣Top250</div>
          <div class="topOneTitle_s">8分以上好电影</div>
        </div>
        <div class="topTwo" @click="toRank(3)">
          <div class="topOneTitle_f">本周口碑榜</div>
          <div class="topOneTitle_s">{{currentWeek}}</div>
        </div>
        <div class="topThree" @click="toRank(3)">
          <div class="topOneTitle_f">新片榜</div>
          <div class="topOneTitle_s">{{currentWeek}}</div>
        </div>
        <div class="topFour" @click="toRank(3)">
          <div class="topOneTitle_f">票房榜</div>
          <div class="topOneTitle_s">票房最高排名</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator, Tabbar, TabItem, TabContainer} from 'mint-ui'
  import star from '../components/star/star'
	 export default {
    data () {
      return {
        isShow: true,
        movieList: [],
        movieSoonList: []
      }
    },
    components: {
      star
    },
    props: ['getParent'],
    beforeCreate(){
      Indicator.open()
    },
    mounted() {
      this.getHotMovie(8)
      this.getSoonMovie(8)
    },
    methods: {
      getHotMovie(index){
          this.$http.get(commonUrl + '/v2/movie/in_theaters?count='+index).then(response => {
          Indicator.close()
          this.movieList = response.data.subjects
        }, response => {
        })
      },
       getSoonMovie(index){
        this.$http.get(commonUrl + '/v2/movie/coming_soon?count='+index).then(response => {
          Indicator.close()
          this.movieSoonList = response.data.subjects
        }, response => {

        })
      },
      toRank(index){
        this.$router.push({name: 'rank', params: {id: index}})
      },
      toMovieDetail(index) {
          this.$router.push({name: 'movieDetail',params: { id: index }})
      },
      toMoviemore() {
        this.$router.push({name: 'more'})
      },
      toMovieshow() {
        this.$router.push({name: 'aboutshow'})
      }
    },
    computed: {
      currentWeek(){
        let date = new Date()
        console.log(date)
        let currentDay = date.getMonth() + 1 + '月' + date.getDate() + '日'
        console.log(currentDay)
        let myDate = new Date()
        myDate.setDate(myDate.getDate() - 7);
        let beforeDay = myDate.getMonth() + 1 + '月' + myDate.getDate() + '日'
        console.log(beforeDay)
        return beforeDay + '~' + currentDay
      }
    },
   }
</script>

<style lang="scss">
	@import '../style/movie'
</style>
