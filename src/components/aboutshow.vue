<template>
	<div id="movieMore">
		<mt-header class='header' :title="movieTitle">
      <mt-button @click='backHome' icon="back" slot="left"></mt-button>
    </mt-header>
		<section id="moviebox" class="section">
			<div class="title_box">
				<div>影院即将上映</div>
			</div>
			<div class="movieList">
				<div v-for="(item,index) in movieList" @click="toMovieDetail(item.id)">
					<div class="poster">
						<img :src="item.images.large">
					</div>
					<div class="movietitle">
						<div class="title">{{item.title}}</div>
						<star class="star" :averages='item.rating.average' v-if="item.rating.average !== 0" :isShow='isShow'></star>
						<div v-if="item.rating.average == 0" class="not_show">即将上映</div>
					</div>
				</div>
				<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"> 
					<span slot="no-more">没有更多了</span>
				</infinite-loading>
			</div>
		</section>
	</div>
</template>

<script>
	import { Header , Indicator} from 'mint-ui'
	import InfiniteLoading from 'vue-infinite-loading';
	import axios from 'axios'
	import star from '../components/star/star'
	export default {
		data () {
			return {
				pageNum: '',
				isShow: true,
				filmName: '',
				movieTitle:'',
				movieData: [],
				movieList: [],
				movieSurplus: '',
				default: '没有了'
			}
		},
		components: {
			star,
			InfiniteLoading
		},
		beforeCreate(){
      Indicator.close()
    },
		mounted() {
		},
		methods: {
      onInfinite() {
      	axios.get(commonUrl+'/v2/movie/coming_soon',{
      		params: {
      			count: this.totalNum - this.pageNum,
      			start: this.pageNum  + 0
      		}
      	}).then((res) => {
      		if (res.data.subjects.length) {
      			this.movieData = this.movieData.concat(res.data)
      			this.movieList = this.movieList.concat(res.data.subjects)
      			this.pageNum = res.data.count
      			this.totalNum = res.data.total
      			console.log(this.totalNum)
      			if(this.movieList.length  === this.totalNum) {
      				this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      				console.log(this.movieList.length)
      			} else {
      				this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      			}
      		}else {
      			this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
      		}
      	})
      },
      toMovieDetail(index) {
          this.$router.push({name: 'movieDetail',params: { id: index }})
      },
			backHome() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss">
	@import '../style/more'
</style>
