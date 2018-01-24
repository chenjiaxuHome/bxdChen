<template>
	  	<div class="home" ref="home" @scroll="handleScroll">
	  		<mt-loadmore
	  		   		:bottom-method="loadBottom" 
	  		   		ref="loadmore"
	  		   		:autoFill="false"
	  		   		:bottom-all-loaded="allLoaded"
	  		   		>
		    	<banner-swper :swiper="swiper" />
		    	<loan-type />
		    	<loan-succ-swiper :loanSuccSwper="loanSuccSwper"/>
		    	<loan-recommendation />
	    	</mt-loadmore>
	    	<div class="abc"></div>
	  	</div>
</template>

<script>
	import swper from "./components/BannerSwper"
	import loantype from "./components/LoanType"
	import loansuccswiper from './components/loanSuccSwiper'
	import loanRecommendation from './components/loanRecommendation'
	import axios from "axios"
	import { mapState, mapActions } from 'vuex'

	export default {

		props: ["swiper", "loanSuccSwper"],
		components: {
		      "banner-swper": swper,
		      "loan-type": loantype,
		      "loan-succ-swiper": loansuccswiper,
		      "loan-recommendation": loanRecommendation
		},
	    data() {
			return {
				res: [],
				allLoaded: false,
				a: {
					index: 1002,
					page: 1,
				},
				h: "",
				wrapperHeight: 0
			}
		},
		activated() {
			if(sessionStorage.scroll) {
				this.$refs.home.scrollTop = parseInt(sessionStorage.scroll);
				 sessionStorage.scroll = "0"
			}else {
				this.$refs.home.scrollTop = 0
			}

		},
		mounted() {
		

			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.home.style.height = h + 'px';


			bus.$on("click", function(index){
				this.a.index = index;    //动态组件传过来的1001
				this.a.page = 1;
				this.allLoaded = false;
			}.bind(this))
			
		},
		
		methods: {
	     	loadBottom() {
				let index = this.a.index
	     		let pages = ++this.a.page
	     		axios.get("/api/bxd_inf_v2/inf/bxd/home?_qtype="+index+"&currentPage="+pages+"")
                    .then((response) => {
                    if(response.status == 200 ) {
                      	this.res = response.data.items
                      	if(response.data.total <= pages * 8) {//如果总页码
                      		this.allLoaded = true;   //加载完成
                      		bus.$emit("hideone")  //当发生改变的时候触发一个时间让那个dom元素显示
                      	}
                      	bus.$emit("change", this.res) //把请求道的数据给当前的list
                      	this.$refs.loadmore.onBottomLoaded();
                  	}
            	})
	     	},
	     	handleScroll() {
	     		var scrollTop =  this.$refs.home.scrollTop
				bus.$emit("changeOne", scrollTop)
	     	}
	     }
	}
</script>


<style scoped>

	.home{
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.abc {
		height: 1.2rem;
	}
</style>
