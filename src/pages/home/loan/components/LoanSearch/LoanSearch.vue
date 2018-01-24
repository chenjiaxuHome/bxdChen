<template>
  <div class="loan-outermost" ref="search">
		<mt-loadmore 
  		   		:bottom-method="loadBottom" 
  		   		ref="loadmore"
  		   		:autoFill="false"
  		   		:bottom-all-loaded="allLoaded"
  		   		>
	     	<div class="loan-middle">
	     		<div class="loan-choice">
	     			<div class="loan-input-top loan-input">
	     				<div class="loan-list">
	     					<span>借款金额</span>
	     					<span>(元)</span>
	     				</div>
	     				<div class="input-amount">
	     					<div class="input-Symbol">&yen;</div>
	     					<input class="input-load" type="tel" v-model.number="InputSearch" placeholder="请输入金额"/>
	     				</div>
	     			</div>
	     			<div class="loan-input-bottom loan-input">
	     				<div class="loan-list">
	     					<span>分期期限</span>
	     					<span>(月)</span>
	     				</div>
	     				<div class="stage-selection" >
	     					<div class="triangle-orange-abroad">
	     						<span class="triangle-orange"></span>
	     					</div>
	     					<div class="input-triangle" @click="handleClick">
	     						<div class="input-selection">{{valueInput}}</div>
	     						<div class="input-gray-within">
	     							<span class="input-gray"></span>
	     						</div>
	     					</div>
	     				</div>
	     			</div>
	     		</div>
	     		<ul class="loan-recommendation-left">
                    <li class="loan-recommendation-list" v-for="item in Search" :key="item.loanId+''" @click="aaa(item.loanId)">
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
                                    <span class="item-bottom-right item-bottom-number">{{item.quotaValue}}元</span>
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

	     </mt-loadmore>
       <div class="abc"></div>
  </div>
</template>

<script>

	import axios from "axios"

	export default {

		data() {

			return {
				Search: [],
				allLoaded: false,
				valueInput: "不限",
				disp: false,
				page: 1,
				slots:[{values: ['年假', '事假', '病假', '婚假', '其他']}],
				InputSearch: "",
				valuea: "",
                timer: null,
                scrollTop: ""
			}

		},

        mounted() { 

                bus.$on("changeSearch", function(res){
                        this.scrollTop = res
                }.bind(this))

                var money = this.InputSearch   //页面初始的时候吧默认的参数传给函数
                var xiala = this.valueInput    //同花上
            	this.LoanSearch(money, xiala)   //传给

            	bus.$on("value", function(index){   //改变input里面的值 从home传过来的
    				this.valueInput = index
    			}.bind(this))
            
        },
        watch: {
                InputSearch() {   //监听input的变化,变化之后执行这个函数
                    clearTimeout(this.timer)
                    this.timer = setTimeout(function(){
                            this.allLoaded = false;   //加载完成
                            this.disp = false;  
                            this.page = 1 
                            console.log(this.InputSearch) 
                        if(this.InputSearch > 500) {
                                this.LoanSearch(this.InputSearch, this.valueInput)
                        }else {
                            this.allLoaded = false;   //加载完成
                            this.disp = false;  
                            let kong = ""
                            this.LoanSearch(kong, this.valueInput)
                        }
                    }.bind(this), 500) 
                },
                valueInput() { //监听div的变化然后执行
                        this.allLoaded = false;   //加载完成
                        this.disp = false; 
                        this.page = 1
                        if(this.InputSearch < 501) {
                            let kong = ""
                            this.LoanSearch(kong, this.valueInput)
                        }else {
                            this.LoanSearch(this.InputSearch, this.valueInput)
                        }
                }
        },
        
        methods: {
                handleClick() {   //触发弹出框
                	bus.$emit("handleClickpupup")
                },
                aaa(loanId) { //跳转路由
                        if(localStorage.lastId && localStorage.userName) {
                            localStorage.removeItem('firstTime')
                            localStorage.removeItem('pageNumberDetails')
                        }else {
                            window.localStorage.firstTime=loanId
                            window.localStorage.pageNumberDetails= "search"
                        }

                    let token = window.localStorage.lastId
                                axios.get("/api/bxd_inf_v2/inf/bxd/apply?token="+token+"&loanId="+loanId+"")
                                .then((response) => {
                                if(response.status == 200 ) {
                                    console.log(response) 
                                }
                    })
                    
                    sessionStorage.setItem("scrollSearch", this.scrollTop);

                	this.$router.push({ path: '/details',
                            query: {
                                loanId: loanId,
                                listPage: "search"
                            }} )
                },

                LoanSearch(money, xiala) {   //默认的参数
            		axios.get("/api/bxd_inf_v2/inf/loan/search?loan_money="+money+"&loan_day="+xiala+"")
                    .then((response) => {
                    if(response.status == 200 ) {
                            this.Search = response.data.item
                             if(this.Search.length < 8) {
                                this.allLoaded = true;  
                                this.disp = true;  
                             }
                        }
                    })
            	},

            	loadBottom() {  //下拉加载的数据
    	     		let pages = ++this.page
                    let money = this.InputSearch
                    if(money < 501) {
                        money = 0 
                    }
    	     		axios.get("/api/bxd_inf_v2/inf/loan/search?currentPage="+pages+"&loan_day="+this.valueInput+"&loan_money="+money+"")
                        .then((response) => {
                        if(response.status == 200 ) {
                          	let res = response.data.item
                          	if(response.data.total <= pages * 8) {   //如果总页码
                          		this.allLoaded = true;   //加载完成
                          		this.disp = true;
                          	}
                          	this.Search = this.Search.concat(res)
                          	this.$refs.loadmore.onBottomLoaded();
                      	}
                	})
            	}

            }
	   }
</script>


<style scoped>
     .abc {
        height: 1.2rem;
    }
  	.loan-outermost{
  	}
  	.loan-middle{
		padding: 0.15rem;
		background: #f0f0f0;
		height: 100%;
		padding-bottom: 0;
  	}
  	.loan-choice{
  		height: 2.3rem;
		background: #fff;
		border-radius: 0.1rem;
  	}
  	.loan-choice {
  		display: flex;
  		flex-direction: column;
  		justify-content: space-around;
  	}
  	.loan-input {
  		display: flex;
  		justify-content: space-around;
  	}
  	.input-amount {
  		display: flex;
  		height: 0.6rem;
  		width: 4rem;
  		background: #f0f0f0;
  		border-radius: 0.1rem;
  		overflow: hidden;
  	}
  	.stage-selection {
  		display: flex;
  		height: 0.6rem;
  		width: 4rem;
  		border-radius: 0.1rem;
  		overflow: hidden;
  	}
  	.input-triangle {
  		display: flex;
  	}
  	.input-Symbol {
  		width: 0.47rem;
  		text-align: center;
  		line-height: 0.6rem;
  		color: #f5bf41;
  	}
  	.triangle-orange-abroad {
  		position: relative;
  		width: 0.47rem;
  		background: #f0f0f0;
  	}
  	.input-gray-within {
  		position: relative;
  		width: 0.49rem;
  		background: #aaaaaa;
      border-radius: 0 0.1rem 0.1rem 0 ;
  	}
	.triangle-orange {
		position: absolute;
		top: 0.24rem;
		left: 0.13rem;
  		width: 0;
  		height: 0;
    	border-left: .1rem solid transparent;
    	border-right: .1rem solid transparent;
    	border-top: .1rem solid #f5bf41;
	}
    .input-gray {
    	position: absolute;
    	top: 0.24rem;
    	left: 0.13rem;
    	width: 0;
  		height: 0;
    	border-left: .1rem solid transparent;
    	border-right: .1rem solid transparent;
    	border-top: .1rem solid #fff;
    }
    .input-load {
    	width: 2.6rem;
    	background: #f0f0f0;
    	font-size: 0.21rem;
    	line-height: 0.6rem;
    	border: 0;
    }
    .input-selection {
    	width: 3rem;
    	font-size: 0.2rem;
    	line-height: 0.6rem;
    	background: #f0f0f0;
    }
    .loan-list {
    	line-height: 0.6rem;
    }
  	/* 一样的 */

    .loan-recommendation-left{
        /* margin: 0 0.15rem; */
    }
    .loan-recommendation-list {
        background: #fff;
        height: 2.35rem;
        margin-top: 0.15rem;
        border-radius: 0.2rem;
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

    }
    .item-bottom-list-quota {
        
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
<style>
    /* 下拉 */
    .picker-slot.picker-slot-center {
        width: 100%;
    }
    .picker-slot.picker-slot-center {
        background: #d1d4dd;
    }
    .v-modal {
        z-index:0!important;
        display: none!important;
    }
    .mint-popup .popup .mint-popup-bottom {
      position: fixed!important;
      z-index: 99!important;
    }
</style>
