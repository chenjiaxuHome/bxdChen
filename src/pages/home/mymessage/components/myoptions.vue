<template>
	<div>
		<div class="my-options">
			<ul class="my-information">
				<li class="my-logo"><img class="my-head-portrait" :src="src.logo"></li>
				<li class="my-phone-number" @click="handlelink">{{src.value}}</li>
			</ul>
		</div>
		<ul class="my-options-list">
			<li class="my-options-item" @click="handleApply">
				<div class="mylist-logos">
					<img class="my-list-logo" :src="src.one">
				</div>
				<span class="my-information-item">贷款进度查询</span>
				<img class="my-Arrow" :src="src.Arrow">
			</li>
			
			<li class="my-options-item" @click="xinyong">
				<div class="mylist-logos">
					<img class="my-list-logo" :src="src.three">
				</div>
				<span class="my-information-item" >办理信用卡</span>
				<img class="my-Arrow" :src="src.Arrow">
			</li>
			<li class="my-options-item" @click="gl">
				<div class="mylist-logos">
					<img class="my-list-logo" :src="src.four">
				</div>
				<span class="my-information-item" >攻略指南</span>
				<img class="my-Arrow" :src="src.Arrow">
			</li>
			<li class="my-options-item"  @click="my">
				<div class="mylist-logos">
					<img class="my-list-logo" :src="src.five">
				</div>
				<span class="my-information-item">我的活动</span>
				<img class="my-Arrow" :src="src.Arrow">
			</li>
			<li class="my-options-item" @click="myInformation">
				<div class="mylist-logos">
					<img class="my-list-logo" :src="src.six">
				</div>
				<span class="my-information-item" >意见反馈</span>
				<img class="my-Arrow" :src="src.Arrow">
			</li>
			<li class="my-options-item"  @click="AboutUs">
				<div class="mylist-logos">
					<img class="my-list-logo" :src="src.two">
				</div>
				<span class="my-information-item">关于我们</span>
				<img class="my-Arrow" :src="src.Arrow">
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from "axios"
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				src: {
					value: "未登录",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					logo: "",
					Arrow: ""
				}
			}
		},
		mounted() {
			if(localStorage.lastId) {
				this.src.value = localStorage.phoneNum
				var phone=localStorage.phoneNum;
				this.src.value = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			}else {
				this.src.value = "点击登录"
			}
			bus.$on("userId", function(res){
                	this.src.value = res
            }.bind(this))

            this.getImgUrl()
		},
		methods: {
			getImgUrl() {
				axios.get("/api/bxd_inf_v2/inf/sys/getImgURL")
                    .then((response) => {
                    if(response.status == 200 ) {
                        var img = response.data.imgUrl
                        this.src.one = img.moneyUrl
                        this.src.two = img.creditReportUrl
                        this.src.three = img.creditCardUrl
                        this.src.four = img.guideUrl
                        this.src.five = img.activityUrl
                        this.src.six = img.moreUrl
                        this.src.Arrow = img.enterUrl
                        this.src.logo = img.userUrl
                    }
                })
			},
			handlelink() {
				this.$router.push({path: '/information'})
			},
			handleApply() {
				this.$router.push({path: '/query'})
			},
			myInformation() {
				this.$router.push({path: '/aboutus'})
			},
			AboutUs() {
				this.$router.push({path: '/myinformation'})
			},
			xinyong() {
				alert("暂未开放")
			},
			my() {
				alert("暂未开放")
			},
			gl() {
				alert("暂未开放")
			}
		}
		
	}
</script>


<style scoped>

	.my-options {
		background: #e69b35;
	}
	.my-information {
		height: 2.4rem;	
		display: flex;
		align-items: center;	
	}
	.my-head-portrait {
		height: 0.8rem;
		width: 0.8rem;
	}
	.my-logo {
		width: 0.8rem;
		padding-left: 0.53rem;
		padding-right: 0.34rem;
	}
	.my-phone-number {
		font-size: 0.4rem;
		color: #fff;
	}
	.my-options-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1rem;
		padding: 0 0.2rem;
		margin-bottom: 0.1rem;
		background: #fff;
	}
	.my-information-item {
		flex: 1;
		font-size: 0.28rem;
	}
	.mylist-logos {
		width: 0.77rem;
	}
	.my-list-logo {
		height: 0.39rem;
	}
	.my-Arrow {
		height: 0.28rem;
	}
</style>
