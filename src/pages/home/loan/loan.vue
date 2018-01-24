<template>
  <div class="loan" ref="loan" @scroll="handleSearchScroll">
       <ul class="loan-recommendation-tab" ref="tablist">
              <li class="recommendation-item" v-for="(item,index) in tabs" @click="toggleTab(item.type, index)" :class="{active: active == index}">
                  <span :class="{option: option == index }">{{item.view}}</span>
              </li>
        </ul>
        <prince :is="currentTab" keep-alive></prince>
  </div>
</template>

<script>
	import loanSearch from './components/loanSearch/loanSearch'
 	import recommendation from './components/recommendation/recommendation'
	export default {
 	

	 	data() {
	            return {
	                currentTab: 'loanSearch',
	                active: 0,
	                option: 0,
	                tabs: [{
	                    type: "loanSearch",
	                    view: "贷款搜索"
	                }, {
	                    type: "recommendation",
	                    view: "贷款推荐"
	                }]
	            }
	    },
        components: { 
                "loanSearch": loanSearch,
                "recommendation": recommendation
        },
        activated() {
                if(sessionStorage.scrollSearch) {
                    this.$refs.loan.scrollTop = parseInt(sessionStorage.scrollSearch);
                    sessionStorage.scrollSearch = 0
                }else {
                    this.$refs.loan.scrollSearch = 0
                }
        },
        mounted() {
                let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                this.$refs.loan.style.height = h + 'px';
                bus.$on("changeTuijian", function(res){   //home触发的
                    this.currentTab = res.currentTab;
    	        	this.active = res.active;
    	        	this.option = res.option
                }.bind(this))
        },
        methods: {
                toggleTab: function(tab, i) {
                    this.currentTab = tab;
                    this.active = i;
                    this.option = i;
                },
                 handleSearchScroll() {
                    var scrollTop = this.$refs.loan.scrollTop
                    bus.$emit("changeSearch", scrollTop)
                }
        }
	}
</script>


<style scoped>
	.loan {
		    overflow: scroll;
        -webkit-overflow-scrolling: touch;	
    }
  	.loan-recommendation-tab {
  		display: flex;
        height: 1rem;
        background: #fff;
    }
    .recommendation-item {
        flex: 1;
        text-align: center;
        line-height: 1rem;
        font-size: 0.26rem;
    }
    .active {
     	color: #f29700;
    }
    .option {
        padding-bottom: 0.3rem;
        border-bottom: 2px solid #f29700;
    }
</style>
