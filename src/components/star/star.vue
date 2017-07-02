<template>
	<div id="star">
		<div v-for='item in starFirst'>
      <img class="starChoose" src="./start_01.png">
    </div>
    <div v-for='item in (5-starFirst)'>
      <img class="starChoose" src="./star_03.png">
    </div>
    <div v-if='isShow' class="rating">{{averages}}</div>
	</div>
</template>

<script>
	export default {
		props: {
			averages: Number,
			isShow: Boolean
		},
		data () {
			return {
				starFirst: '',
				average: ''
			}
		},
		mounted(){
			this.getCurrentStars()
		},
		methods: {
			getCurrentStars(){
				this.starFirst = parseInt(this.averages/2)
			}
		}
	}
</script>

<style lang="scss">
	#star {
    display: -webkit-box;
    margin: {
    	bottom: .3rem;
    }
    .starChoose {
      width: .5rem;
    }
    .rating {
      color: #9b9b9b;
      font: {
        size: .6rem;
      }
    ;
      position: relative;
      top: .3rem;
    }
  }
</style>
