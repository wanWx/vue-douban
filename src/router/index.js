import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home'
import movie from '@/components/movie'
import movieDetail from '../page/movieDetail'
import more from '@/components/more'
import aboutshow from '@/components/aboutshow'
import rank from '../page/rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      redirect: 'home',
      children: [
      	{
      		path: '/home/',
      		component: movie
      	}
      ]	
    },
    {
      path: '/movieDetail/:id',
      name: 'movieDetail',
      component: movieDetail
    },
    {
      path: '/more/',
      name: 'more',
      component: more
    },
    {
      path: '/aboutshow/',
      name: 'aboutshow',
      component: aboutshow
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: rank
    }
  ]
})
