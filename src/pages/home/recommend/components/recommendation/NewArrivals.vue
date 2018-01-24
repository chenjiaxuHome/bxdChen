<template>
   <div>
	   		<ul class="loan-recommendation-left">
	   			<li class="loan-recommendation-list" v-for="item in recommenddation" :key="item.loanId+''" @click="handleClickLink(item.loanId)">
	   				<div class="recommendation-item-top">
	   					<div class="recommendation-item-top-logotext">
	   						<img class="item-top-img" :src="item.iconURL">
	   						<span class="company-name">{{item.loanName}}</span>
	   					</div>
	   					<span class="application-number">{{item.snum}}人已申请</span>
	   					<span class="immediate-application">{{item.button}}</span>
	   				</div>
	   				<div class="recommendation-item-bottom">
	   					<ul class="item-bottom">
	   						<li class="item-bottom-list-interestRate">
	   							<span class="item-bottom-left">{{item.Rate}}</span>
	   							<span class="item-bottom-right">{{item.RateValue}}</span>
	   						</li>
	   						<li class="item-bottom-list-quota">
	   							<span class="item-bottom-left">{{item.quota}}</span>
	   							<span class="item-bottom-right item-bottom-number">{{item.quotaValue}}</span>
	   						</li>
	   						<li class="item-bottom-list-successRate">
	   							<span class="item-bottom-left">{{item.succ}}</span>
	   							<span class="item-bottom-right">{{item.succValue}}</span>
	   						</li>
	   					</ul>
	   				</div>
	   			</li>
	   			<li v-show="disp" class="loan-recommendation-end">已经底部</li>
	   		</ul>
   </div> 
</template>

<script>
	import axios from "axios"
	
	export default {

	     data() {
		     	return {
		     		recommenddation: [],
		     		disp: false,
		     		scrollTop: ""
		     	}
	     },

	     mounted () {
	     		bus.$on("changeOne", function(res){
	    			this.scrollTop = res
	    		}.bind(this))
	    		
	     		axios.get("/api/bxd_inf_v2/inf/bxd/home?_qtype=1003")
                    .then((response) => {
                    if(response.status == 200 ) {
                      	let recommenddation = response.data.items
                      	this.recommenddation = recommenddation;
                  	}
            	}),
                bus.$on("change", function(res){
                	this.recommenddation = this.recommenddation.concat(res)
                }.bind(this)),
                bus.$on("hideone", function(){
                	this.disp = true
                }.bind(this))
	     },

	     methods: {
	     	handleClickLink(loanId) {  //点击跳转

     				if(localStorage.lastId && localStorage.userName) {  //跳转的判断
 						localStorage.removeItem('firstTime')
 						localStorage.removeItem('pageNumberDetails')
 					}else {
 						window.localStorage.firstTime=loanId
 						window.localStorage.pageNumberDetails= "2"
 					}

	     			let token = window.localStorage.lastId     //记录用户
		     				axios.get("/api/bxd_inf_v2/inf/bxd/apply?token="+token+"&loanId="+loanId+"")
		                    .then((response) => {
		                    if(response.status == 200 ) {
		                       
		                    }
	                })
		            
		            sessionStorage.setItem("scroll", this.scrollTop);

	     			this.$router.push({    //跳转
	     				path: '/details',
	     				query: {
	     					loanId: loanId,
	     					listPage: 2
	     				}

	     		})
	     	}
	     }
	     
	}

</script>


<style scoped>
	.loan-recommendation-left{
		margin: 0 0.15rem;
	}
	.loan-recommendation-list {
		background: #fff;
		height: 2.35rem;
		margin-top: 0.15rem;
		border-radius: 0.3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.recommendation-item-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.16rem 0.16rem 0.1rem 0.2rem;
		margin-bottom: 0.2rem;
	}
	.recommendation-item-top-logotext {
		display: flex;
		align-items: center
	}
	.item-top-img {
		height: 0.8rem;
		margin-right: 0.18rem;
		border-radius: 50%
	}
	.company-name {
		line-height: 0.58rem;
		padding-left:0.2rem;
		display: inline;
		width: 2.1rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
   		font-weight: 600;
   		font-size: 0.28rem;
   		color: #434343;
	}
	.application-number {
		line-height: 0.47rem;
		margin-right: 0.24rem;
		font-size: 0.19rem;
		color: #999999;
		flex: 1;
		padding-top: 0.1rem;
		text-align: right;
	}
	.immediate-application {
		display: inline-block;
		margin-top: 0.06rem;
		height: 0.6rem;
		width: 1.85rem;
		background: #f29700;
		text-align: center;
		line-height: 0.6rem;
		border-radius: 0.1rem;
		font-size: 0.25rem;
		color: #fff;
	}
	.recommendation-item-bottom {
		padding: 0.2rem;
	}
	.item-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item-bottom-list-interestRate {
		/* width: 28%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis; */
	}
	.item-bottom-list-quota {
		/* flex: 1;
		padding-left: 0.4rem; */
	}
	.item-bottom-list-successRate {
		width: 25%;
	}
	.item-bottom-left {
		font-size: 0.26rem;
		font-weight: 500;

		color: #000;
	}
	.item-bottom-right {
		height: 0.26rem;
		color: #ff0000;
		font-weight: 500;
		font-size: 0.3rem;
	}
	.item-bottom-number {
		text-align: left;
	}
	.mt-1 {
		padding-bottom: 2rem;
	}
	.loan-recommendation-end {
		height: 1rem;
		text-align: center;
		line-height: 1rem;
	}
</style>
