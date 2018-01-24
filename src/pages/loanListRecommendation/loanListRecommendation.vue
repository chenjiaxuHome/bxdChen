<template>
		<div class="loan-list-recommendation" ref="abc" @scroll="handleLoan">
            
            <mt-loadmore 
                :bottom-method="loadBottom" 
                ref="loadmore"
                :autoFill="false"
                :bottom-all-loaded="allLoaded"
                >
                
            <div class="details-head">
                    <img class="details-head-img" @click="handleReturnRouter" :src="img.h">
                    <span class="details-head-teatle">必须贷</span>
            </div>
    			<ul class="loan-recommendation-left">
    	   			<li class="loan-recommendation-list" v-for="item in dataTypeList" @click="handleClickLink(item.loanId)">
    	   				<div class="recommendation-item-top">
    	   					<img class="item-top-img" :src="item.iconURL">
    	   					<div class="recommendation-item-top-logotext">
    	   						<span class="company-name">{{item.loanName}}</span>
    	   						<span class="application-number">{{item.snum}}人已申请</span>
    	   					</div>
    	   					<span class="immediate-application">{{item.button}}</span>
    	   				</div>
    	   				<div class="recommendation-item-bottom">
    	   					<ul class="item-bottom">
    	   						<li class="item-bottom-list-interestRate">
    	   							<span class="item-bottom-left">日利率</span>
    	   							<span class="item-bottom-right">0.03%</span>
    	   						</li>
    	   						<li class="item-bottom-list-quota">
    	   							<span class="item-bottom-left item-bottom-left-center">{{item.quota}}</span>
    	   							<span class="item-bottom-right item-bottom-number">{{item.quotaValue}}元</span>
    	   						</li>
    	   						<li class="item-bottom-list-successRate">
    	   							<span class="item-bottom-left">{{item.succ}}</span>
    	   							<span class="item-bottom-right">{{item.succValue}}</span>
    	   						</li>
    	   					</ul>
    	   				</div>
    	   			</li>
                    <li class="disp" v-show="show">加载到底部</li>
    	   		</ul>
            </mt-loadmore>
		</div>
</template>

<script>
	import axios from "axios"
	import { MessageBox } from 'mint-ui';
	export default {
 		data() {
 			return {
 				dataTypeList: [],
                allLoaded: false,
 				img: {
                    h: ""
				},
                page: 1,
                positionReturn: {
                    currentTab: 'recommendation',
                    active: 1,
                    option: 1
                },
                position: "",
                show: false,
                scrollMode: "auto",
                scrollTop: ""
 			}
 		},
       activated() {
            
            if(this.$route.query.parameter !==sessionStorage.parameter) { //判断和上次路由
                this.postListdata();
                this.allLoaded = false;
                this.show = false;
                this.page = 1
            }
            sessionStorage.setItem("parameter", this.$route.query.parameter);
            
            if(sessionStorage.scrollLoan) {
                this.$refs.abc.scrollTop = parseInt(sessionStorage.scrollLoan);
                sessionStorage.scrollLoan = 0
            }else {
                this.$refs.abc.scrollTop = 0
            }
        },
 		mounted() {
            this.postListdata();
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.abc.style.height = h + 'px';
 		},
 		methods: {

 			postListdata() {
 				var params = new URLSearchParams()
				params.append("parameter", this.$route.query.parameter)
 				axios.post("/api/bxd_inf_v2/inf/loan/recommend", params)
        			.then(function (response) {
        				if(response.status == 200) {
                        this.img.h = response.data.imgUrl.returnURL
            					this.dataTypeList = response.data.items
                                this.position = this.$route.query.listPosition
                    	}
        			}.bind(this))
		        	.catch(function (error) {
		            	console.log(error);
		        });

 			},

            loadBottom() {

                let pages = ++this.page
                axios.get("/api/bxd_inf_v2/inf/loan/recommend?parameter="+this.$route.query.parameter+"&currentPage="+pages+"")
                    .then((response) => {
                    if(response.status == 200 ) {
                        var res = response.data.items
                        if(response.data.total <= pages * 8) {//如果总页码
                            this.allLoaded = true;
                            this.show = true;
                            this.scrollMode = "touch";
                        }
                        this.dataTypeList = this.dataTypeList.concat(res)
                        this.$refs.loadmore.onBottomLoaded();
                    }
                })

            },

            handleReturnRouter() {

                this.$router.push({path: "/",  query: { 
                        currentTab: this.positionReturn
                    }
                })
                
            },

            handleClickLink(loanId) {  //点击跳转

                    if(localStorage.lastId && localStorage.userName) {
                        localStorage.removeItem('firstTime')
                        localStorage.removeItem('pageNumberDetails')
                    }else {
                        window.localStorage.firstTime=loanId
                        window.localStorage.pageNumberDetails= "loan"
                    }

                    sessionStorage.setItem("scrollLoan", this.scrollTop);

                    let token = window.localStorage.lastId
                            axios.get("/api/bxd_inf_v2/inf/bxd/apply?token="+token+"&loanId="+loanId+"")
                            .then((response) => {
                            if(response.status == 200 ) {
                                
                            }
                    })
                    this.$router.push({
                        path: '/details',
                        query: {
                            loanId: loanId,
                            listPage: "loan"
                        }

                    })
            },
            handleLoan() {
                    var scrollTop =  this.$refs.abc.scrollTop
                    this.scrollTop = scrollTop
            }
 		}
	}
</script>


<style scoped>
    .details-head {
        position: relative;
        z-index: 100;
        height: 1rem;
        background: #fff;
        display: flex;
        align-items: center;
    }
    .details-center {
        margin-bottom: 0.2rem;
    }
    .details-head-img {
        height: 0.5rem;
        position: absolute;
        padding-left: 0.2rem;
    }
    .details-head-teatle {
        flex: 1;
        text-align: center;
        font-size: 0.3rem;
        color: #414141;
    }
    .loan-list-recommendation {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .loan-list-kong {
        
    }

    .loan-recommendation-left{
        margin: 0 0.1rem;
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
    .disp {
        height: 1rem;
        text-align: center;
        line-height: 1rem;
    }
</style>
