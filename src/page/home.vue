<template>
	<div id='home'>
    <!-- 底部选项卡 -->
    <mt-tabbar class='tab' v-model="selected">
      <mt-tab-item id="movie">
        书影音
      </mt-tab-item>
      <mt-tab-item id="search">
        搜索
      </mt-tab-item>
      <mt-tab-item id="myself">
        我的
      </mt-tab-item>
    </mt-tabbar>
    <mt-tab-container class='home_main' v-model="selected">
      <div class="tab-main" v-show="selected == 'movie'">
        <div class="tab-menu">
          <div :class="[tabName,{checkStyle:chooseIndex == index}]" @click='chooseItem(index,item.type)'
               v-for='(item,index) in menuList'>{{item.name}}
          </div>
        </div>
        <!-- 嵌套路由 -->
        <router-view :get-parent = 'menuList'></router-view>
      </div>
      <div class="self" v-show="selected == 'myself'">
        <self></self>
      </div>
      <div class="search" v-show="selected == 'search'">
        <search></search>
      </div>
    </mt-tab-container>
  </div>
</template>
	
<script>
  import self from '../page/self'
  import search from '../components/search'
  export default {
    components: {
      self,
      search
    },
    data() {
      return {
        selected: 'movie',
        chooseIndex: '0',
        tabName: 'tabName',
        menuList: [
          {name: '电影', type: 1},
          {name: '读书', type: 2},
          {name: '电视', type: 3},
          {name: '同城', type: 4},
          {name: '音乐', type: 5}
        ],
        isShow: true
      }
    },
    methods: {
      chooseItem (index, type) {
        this.chooseIndex = index
        console.log(index)
      }
    } 
  }
</script>

<style lang="scss">
@import '../style/home';
</style>
