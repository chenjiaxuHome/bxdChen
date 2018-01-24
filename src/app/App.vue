<template>
  <div id="app" ref="app">
    	<keep-alive>
    		<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
	export default {
	  name: 'app'
	}
</script>

<style>
	/* #app{
		overflow: scroll;
	} */
	@import "./reset.css";
	@import '../../node_modules/swiper/dist/css/swiper.css';
</style>
