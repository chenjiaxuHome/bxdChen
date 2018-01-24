<template>
	<div class="apply" ref="apply">
		<div class="details-head" >
           	<img class="details-head-img" @click="details" :src="imgUrl.returnUrl">
            <span class="details-head-teatle">完善信息</span>
        </div>
        <div class="surplus"></div>
        <div class="HowSmall"></div>
		<ul class="apply-list">
			<li class="apply-item">
				<div class="apply-describe">
					<div class="package-img">
						<img class="apply-describe-img-occupation" :src="imgUrl.choiceUrl">
					</div>
					<span class="apply-describe-text">请选择您的职业身份</span>
				</div>
				<ul class="apply-describe-list" >
					<li class="apply-describe-item" v-for="(item,index) in ProfessionalIdentity" @click="toggleTab(item, index)" :class="{active: active==index}">{{item.companyName}}</li>
				</ul>
			</li>
			<li class="apply-item">
				<div class="apply-describe">
					<div class="package-img">
						<img class="apply-describe-img-credit" :src="imgUrl.iscreditUrl">
					</div>
					<span class="apply-describe-text" @click="handlego">您是否有用信用卡</span>
				</div>
				<ul class="apply-credit-list">
					<li class="apply-credit-item" v-for="(item, index) in creditCard" @click="tabCredit(item, index)" :class="{style: style==index}">{{item.why}}</li>
				</ul>
			</li>
			<li class="apply-item">
				<div class="apply-describe">
					<div class="package-img">
						<img class="apply-describe-img-information" :src="imgUrl.infoUrl"> 
					</div>
					<span class="apply-describe-text">请填写您的基本信息</span>
				</div>
				<div class="apply-text">
					<ul class="fill-in">
						<li><input class="fill-in-name" type="text" placeholder="请填写姓名" v-model="name"/></li>
						<li class="fill-in-plus">+</li>
						<li><input class="fill-in-id" type="tel" maxlength="18" v-model="IdNumber" placeholder="请输入身份证号" /></li>
					</ul>
					<div class="real-text">
						<img class="notice" :src="imgUrl.reminderUrl"> 
						<span class="notice-text">请填写真实资料，可以更快获得借款</span>
					</div>
				</div>
			</li>
			<div class="submit-center">
				<div class="submit" @click="submit">保存</div>
			</div>
		</ul>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		data() {
			return {
				active:0,
				style: 0,
                ProfessionalIdentity: [{
                	id: 1,
                	companyName: "打工族"
                },{
                	id: 2,
                	companyName: "企业族"
                },{
                	id: 3,
                	companyName: "个体户"
                },{
                	id: 4,
                	companyName: "自由职业"
                }],
                creditCard: [{
                	id: 1,
                	why: "有"
                },{
                	id: 2,
                	why: "无"
                }],

                name: "",   //名字的判断
                IdNumber: "",	//身份证号的判断
                ChoiceName: false,
                ChoiceIdNumber: false,
                token: "",
                identitys: "打工族", //默认值
                Choices: "有",	//默认值
                imgUrl: {}
			}
		},
		mounted() {
				let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	            this.$refs.apply.style.height = h + 'px';
				this.getImg()
		},
		methods: {
				getImg() {
					axios.get("/api/bxd_inf_v2/inf/sys/getUserMsgImg") //让用户登录
                	.then((response) => {
                      if(response.status == 200) {
                            this.imgUrl = response.data.imgUrl
                      	}
        			})  
				},
                toggleTab(item, i) {
                     this.active = i
                     this.identity = i
                     this.identitys = item.companyName
                },
                tabCredit(item, i) {
                	this.style = i
                	this.Choice = i
                	this.Choices = item.why
                },
                handlego() {
                	this.$router.go(-1)
                },
                submit() {
                	var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
	                if(this.IdNumber == "") {
	                	this.ChoiceName = false;
	 				 	alert("身份号为空")
	 				}else if(!reg.test(this.IdNumber)) {
	 					this.ChoiceName = false;
	 					alert("错误")
	 				}else {
						this.ChoiceName = true;
	 				}
	 				if(this.name.length <= 1) {
	 					this.ChoiceIdNumber = false;
	 					alert("名字错误")
	 				}else {
	 					this.ChoiceIdNumber = true;
	 				}

	 				if(this.ChoiceIdNumber == true && this.ChoiceName == true) {
	 					this.token = localStorage.lastId
	 					var params = new URLSearchParams()
						params.append("userName",this.name)
						params.append("idCard",this.IdNumber)
						params.append("careerType",this.identity)
						params.append("isCreditcard",this.Choice)
						params.append("token",this.token)
	 					axios.post("/api/bxd_inf_v2/inf/sys/setUserMsg", params)  //给后端发送验证码
			        	.then(function (response) {
			        		if(response.status == 200) {
			            		window.localStorage.userName=this.name
		        				window.localStorage.idCard=this.IdNumber    	
		        				window.localStorage.careerType=this.identitys	//qiye
		        				window.localStorage.isCreditcard=this.Choices  //you
		        				if(this.$route.query.pages == "information") {
		        					this.$router.push({path: '/information'})
		        				}
		        				if(this.$route.query.pages == "details") {
		        					let loanId = window.localStorage.firstTime
		        					let listPages = window.localStorage.pageNumberDetails
		        					this.$router.push({
					     				path: '/details',
					     				query: {
					     					loanId: loanId,
					     					listPage: listPages
					     				}

					     			})
		        				}
			                }
			        	}.bind(this))
			        	.catch(function (error) {
			            	console.log(error);
			        	});
	 				}

                },
                details() {
                	this.$router.go(-1)
                }
        }
	}
</script>


<style scoped>
	.apply {
		background: #fff;
	}
	.details-head {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 1rem;
        background: #fff;
        display: flex;
        align-items: center
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
        font-weight: 300;
        color: #000;
    }
    .surplus {
    	height: 1rem;
    }
	.HowSmall {
		height: 0.2rem;
		background: #f0f0f0;
	}

	.apply-list {
		background: #fff;
	}
	.apply-item {
		height: 1.7rem;
		margin: 0 0.2rem;
		background: #fff;
		padding-top: 0.26rem;
		border-bottom: 1px solid #e1e1e1;
	}
	.apply-describe {
		display: flex;
		align-items: center;
	}
	.apply-describe-text {
		font-size: 0.24rem;
		color: #999999;
	}
	.apply-describe-list {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 1.15rem;
	}
	.apply-describe-item {
		height: 0.6rem;
		width: 1.3rem;
		border: 1px solid #b5b5b5;
		border-radius: 0.1rem;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.22rem;
		color: #b5b5b5;
	}
	.apply-credit-list {
		display: flex;
		align-items: center;
		height: 1.15rem;
		margin-left: 0.3rem;
	}
	.apply-credit-item {
		height: 0.6rem;
		width: 1.3rem;
		margin: 0 0.12rem;
		border: 1px solid #b5b5b5;
		border-radius: 0.1rem;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.22rem;
		color: #b5b5b5;
	}
	.apply-text {
		height: 1.15rem;
	}
	.fill-in {
		display: flex;
		margin-top: 0.18rem;
		margin-left: 0.42rem;
		margin-bottom: 0.1rem;
	}
	.fill-in-name {
		width: 1.18rem;
		border: 0;
		border-bottom: 1px solid #e1e1e1;
		font-size: 0.24rem;
	}
	.fill-in-plus {
		width: 0.75rem;
		height: 0.43rem;
		font-size: 0.5rem;
		text-align: center;
		line-height: 0.43rem
	}
	.fill-in-id {
		border: 0;
		border-bottom: 1px solid #e1e1e1;
		font-size: 0.24rem;
	}
	.real-text {
		height: 0.44rem;
		margin-left: 0.42rem;
		display: flex;
		align-items: center;
	}
	.notice-text {
		font-size: 0.2rem;
		color: #d3d3d3;
	}
	.submit-center {
		display: flex;
		justify-content: center;
	} 
	.submit {
		width: 5.3rem;
		height: 0.7rem;
		border-radius: 0.1rem;
		background: #e59b35;
		text-align: center;
		margin-top: 1.3rem;
		line-height: 0.7rem;
		color: #fff;
	}
	/* img */
	.package-img {
		width: 0.43rem;
	}
	.apply-describe-img-occupation {
		height: 0.28rem;
	}
	.apply-describe-img-credit {
		height: 0.24rem;
	}
	.apply-describe-img-information {
		height: 0.25rem;
	}
	.notice {
		height: 0.18rem;
		margin-right: 0.16rem;
	}
	.active {
		color: #e59b35;
		border-color: #e59b35;
	}
	.style {
		color: #e59b35;
		border-color: #e59b35;
	}
</style>
