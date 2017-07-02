<template>
	<div id="rank" v-if="topList.length > 0 ">
		<mt-header class='header' :title="filmName">
      <mt-button @click='backHome' icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="list-main">
      <div class="list" v-show="isChooseShow" v-for='(item,index) in topList' @click='toMovieDetail(item.id)'>
        <div class="line">
          <div class="lineLeft"></div>
          <div :class="[num,{numF:index+ currentChoose + 1 == 0,numS:index+ currentChoose + 1 == 1,numT:index+ currentChoose + 1 ==2}]">
            {{index + currentChoose + 1}}
          </div>
          <div class="lineRight"></div>
        </div>
        <div class="menu" v-if="">
          <div class="avatars"><img :src="item.images.medium"></div>
          <div class="info">
            <div class="name">{{item.title}}</div>
            <star class='star' :averages='item.rating.average' :isShow='isShow'></star>
            <div class="alts"><span>导演:</span><span v-for='item2 in item.directors'>{{item2.name}}</span></div>
            <div class="alts"><span>演员:</span><span v-for="(item3,index) in item.casts">{{item3.name}}<span
              v-if='index < item.casts.length -1'>/</span></span></div>
          </div>
        </div>
      </div>
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"> 
					<span slot="no-more">没有更多了</span>
				</infinite-loading>
    </div>
	</div>
</template>
	
<script>
	import { Header , Indicator} from 'mint-ui'
	import InfiniteLoading from 'vue-infinite-loading';
	import axios from 'axios'
	import star from '../components/star/star'
	export default {
		data() {
			return {
				start: 0,
        count: 12,
        num:'num',
        topList: [],
        pageNum: [],
        isShow: true,
        currentChoose: 0,
        isChoose:'',
        isChooseShow: true,
        filmName: '',
        totalNum: ''
			}
		},
		beforeCreate(){
			Indicator.open()
    },
		mounted(){
      switch (this.$route.params.id) {
        case 0:
          this.onInfinite()
          this.filmName='TOP250'
          break
        case 1:
          this.getWeekly()
          break
        case 2:
          this.getNew()
          break
        case 3:
          this.getInTheaters()
          this.filmName='票房榜'
          break
      }
    },
		methods: {
			onInfinite(){
        axios.get(commonUrl + '/v2/movie/top250',{
        	params: {
        		count: 20,
      			start: this.pageNum  + 0
        	}
        }).then(res => {
        	Indicator.close()
          if (res.data.subjects.length) {
      			this.topList = this.topList.concat(res.data.subjects)
      			this.pageNum = res.data.count + res.data.start
      			this.totalNum = res.data.total
      			this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
      		}else {
      			this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
      		}
        }, res => {

        })
      },
      /**本周口碑榜
       * **/
      getWeekly(){
        this.$http.get(commonUrl + '/v2/movie/weekly').then(response => {
          console.log(response)
          Indicator.close()
          this.topList = response.data.subjects
        }, response => {

        })
      },
      /**
       * 新片榜
       * **/
      getNew(){
        this.$http.get(commonUrl + '/v2/movie/new_movies').then(response => {
          console.log(response)
          Indicator.close()
          this.topList = response.data.subjects
        }, response => {

        })
      },
      /**
       * 正在上映
       * **/
      getInTheaters(){
        this.$http.get(commonUrl + '/v2/movie/in_theaters').then(response => {
          console.log(response)
          Indicator.close()
          this.topList = response.data.subjects
        }, response => {

        })
      },
      toMovieDetail () {

      },
      choose () {

      },
      backHome () {
      	this.$router.go(-1)
      }
		},
		components: {
			star,
			InfiniteLoading
		}
	}
</script>

<style lang="scss">
	@import '../style/rank'
</style>
