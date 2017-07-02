<template>
	<div id="movieMore">
		<mt-header class='header' :title="movieTitle">
      <mt-button @click='backHome' icon="back" slot="left"></mt-button>
    </mt-header>
		<section id="moviebox" class="section">
			<div class="title_box">
				<div>影院热映</div>
			</div>
			<div class="movieList">
				<div v-for="item in movieList">
					<div class="poster">
						<img :src="item.images.large">
					</div>
					<div class="movietitle">
						<div class="title">{{item.title}}</div>
						<star class="star" :averages='item.rating.average' v-if="item.rating.average !== 0" :isShow='isShow'></star>
						<div v-if="item.rating.average == 0" class="not_show">即将上映</div>
					</div>
				</div>
			</div>

		</section>
	</div>
</template>

<script>
	import { Header , Indicator} from 'mint-ui'
	import star from '../components/star/star'
	export default {
		data () {
			return {
				pageNum: 12,
				isShow: true,
				filmName: '',
				movieTitle:'',
				movieData: '',
				movieList: [],
				movieSurplus: '',
				a: ''
			}
		},
		components: {
			star
		},
		beforeCreate(){
      Indicator.open()
    },
		mounted() {
			this.getHotMovie(this.pageNum,0)
			window.addEventListener('scroll', this.menu)
		},
		methods: {
			getHotMovie(index,start){
          this.$http.get(commonUrl + '/v2/movie/in_theaters?count='+index+'&'+'start='+start).then(response => {
          Indicator.close()
          this.movieData = response.data
          this.movieList = response.data.subjects
          this.pageNum = response.data.count
          this.totalNum = response.data.total
          this.movieTitle = response.data.title.split('-')[0]
          this.movieSurplus = response.data.total - response.data.count
        }, response => {
        })
      },
      getHotMovies(index,start){
          this.$http.get(commonUrl + '/v2/movie/in_theaters?count='+index+'&'+'start='+start).then(response => {
          Indicator.close()
          this.movieList = this.movieList.concat(response.data.subjects)
          console.log(this.movieList)
          this.pageNum = response.data.count
          this.totalNum = response.data.total
          this.movieTitle = response.data.title.split('-')[0]
          this.movieSurplus = response.data.total - response.data.count
        }, response => {
        })
      },
      menu() {
        this.scroll = document.body.scrollTop;
        var topHeight = document.getElementById('moviebox').offsetHeight
        var windHeight = window.innerHeight
        if(this.scroll + windHeight > topHeight-3) {
        	if(this.movieSurplus !== this.pageNum+this.movieSurplus){
        		this.a = this.pageNum+this.totalNum
        		console.log('到底了')
        	console.log(this.movieSurplus)
        	console.log(this.pageNum)
        	console.log(this.totalNum)
        	console.log(this.a)
        	this.getHotMovies(this.movieSurplus,this.pageNum)
        	}
        	
        	//请求太频繁了，需要请求一次跳出
        }
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
