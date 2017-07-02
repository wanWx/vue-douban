<template>
	<div id="movieDetail" v-if="movie.title != null">
		 <mt-header class='header' :title="filmName">
      <mt-button @click='backHome' icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="nav" v-if='large !="" '>
      <img class="nav-img" :src="large">
    </div>

    <div class="main">
    	<div class="main-name">
    		<div class="name">
    			{{movie.title}}
    		</div>
    		<div class="type">
    			<span class="time">{{movie.year}}</span>
    			<span v-for="item in movie.countries" class="countries">{{ item }}</span>
    			<span v-for="(item,index) in movie.genres" class="genres">{{ item }}<span v-if='index < movie.genres.length-1'>/</span></span>
    		</div>
    	</div>
    	<div class="scroe">
    			<div class="scroe_title">豆瓣评分</div>
    			<div>
    				<div class="scroe_rating">{{movie.rating.average}}</div>
						<star :averages="average" class="scroe_star"></star>
						<div class="scroe_count" v-if="movie.rating.average > 0">{{movie.collect_count}}</div>
						<div class="scroe_n" v-if="movie.rating.average === 0">尚未上映</div>
    			</div>
    	</div>
    </div>

    <div class="review">
    	<div>
        <button>想看{{movie.wish_count}}</button>
      </div>
      <div>
        <button>看过{{movie.reviews_count}}</button>
      </div>
    </div>

    <div class="desc">
      <div class="title">剧情简介</div>
      <div class="content">{{movie.summary}}</div>
    </div>

     <div class="director">
      <div class="title">影人</div>
      <div class="worker">
        <div v-for="item in movie.directors" v-if="item.avatars !== null">
          <img :src="item.avatars.small" v-if="item.avatars !== null">
          <div class="name" v-if="item.avatars !== null">{{item.name}}</div>
        </div>
        <div v-for='item in movie.casts'>
          <img :src="item.avatars.small" v-if="item.avatars !== null">
          <div class="name" v-if="item.avatars !== null">{{item.name}}</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import { Header , Indicator} from 'mint-ui';
	import star from '../components/star/star';
	export default {
		data() {
			return {
				filmName: '',
				large: '',
				movie: {},
				average: '',
				isShow: false
			}
		},
		components: {
			star
		},
		beforeCreate(){
      Indicator.open()
    },
		mounted() {
			this.getMovieDetail()
		},
		methods: {
			/****获取电影详情***/
			getMovieDetail() {
				this.$http.get(commonUrl + '/v2/movie/subject/' + this.$route.params.id).then(response => {
          Indicator.close()
          this.movie = response.data
          this.filmName = response.data.title
          this.large = response.data.images.large
          this.average = response.data.rating.average
          console.log(response)
        }, response => {

        })
			},
			backHome() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss">
	@import '../style/movieDetail'
</style>
