<template>
		<div class="login" ref="login">
			<div class="login-logo">
				<img class="login-logo-img" :src="logo">
			</div>
			<div class="login-details">
				<div class="login-phone">
					<span class="login-phone-number">手机号</span>
					<input class="phone-value" type="tel" placeholder="请输入手机号" v-model="phone" v-on:blur="changeCount" />
				</div>
				<span class="phone-prompt">{{prompt}}</span>

				<div class="login-Verification-img">
					<span class="login-Verification">图片验证码</span>
					<input type="text" class="Verification-value" placeholder="请输入验证码" v-model="picture"  />
					<div class="code-img" @click="handleChangeImg">
						<img class="code-is-True" :src="code">
					</div>
				</div>
				<span class="verificationText"></span>


				<div class="login-Verification-img">
					<span class="login-Verification">验证码</span>
					<input type="tel" class="Verification-value" placeholder="请输入验证码" v-model="verification" v-on:blur="verificationText" />
					<div class="Verification-img" v-show="show" @click="handchangeImg">获取验证码</div>
					<div class="Verification-img CountDown" v-show="showFalse">{{count}} s</div>
					<div class="Verification-img CountIng" v-show="showTrue">正在发送</div>
				</div>
				<span class="verificationText">{{veText}}</span>


				<div class="login-button" v-show="login"  @click="submit">
					登录
				</div>
				<div v-show="loginIng" class="login-button">
					正在登陆
				</div>
			</div>
		</div>
</template>

<script>
	import axios from "axios"
	import { MessageBox } from 'mint-ui';
	export default {
 		data() {
 			return {
 				code: "",
 				logo: "",
 				phone: "",
 				verification: "",    //手机验证码
 				picture: "",        //图片验证码
 				imgMsg: false,    //图片验证码是否正确
 				prompt: "",
 				veText: "",
 				show: true,  //是否显示
 				showFalse: false,  //定时器
 				showTrue: false,		//请求中
 				count: '',   //显示的倒计时
 				timer: null, //清除定时器的
 				valuetop: false,
 				valuebottom: false,
 				showCancelButton: false,
 				time: null,
 				login: true,   //登陆
 				loginIng: false    //登录中
 			}
 		},
 		mounted() {
 			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.login.style.height = h + 'px';
 			axios.post("/api/bxd_inf_v2/inf/sys/loginPage")
        	.then(function (response) {
        		if(response.status == 200) {
            		let logo = response.data.imgLogo  //logo
            		let code = response.data.imgCode  //logo
            		this.code = code;
            		this.logo = logo;
                }
        	}.bind(this))
        	.catch(function (error) {
            	console.log(error);
        	});
            
 		},
 		methods: {
 			changeCount() {    //手机号失去焦点的时候
				var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(this.phone == "") {
				 	this.prompt = "手机号不能为空"
				 	this.valuetop = false;
				}else if(!reg.test(this.phone)) {
				 	this.prompt = "手机格式不正确";
				 	this.valuetop = false;
				}else {
				 	this.prompt = ""
				 	this.valuetop = true
				}
 			},
 			verificationText() {   //手机验证码失去焦点
 				if(this.verification == "") {
 					this.veText = "验证码不能为空"
 					this.valuebottom = false;
 				}else {
 					this.veText = ""
 					this.valuebottom = true;
 				}
 			},

 			handleChangeImg() {    //点击验证码的时候
 				axios.post("/api/bxd_inf_v2/inf/sys/loginPage")
	        	.then(function (response) {
	        		if(response.status == 200) {
	        			let code = response.data.imgCode  //logo
	        			this.code = code;
	                }
	        	}.bind(this))
	        	.catch(function (error) {
	            	console.log(error);
	        	});
 			},
 			submit() {

 				if(this.valuetop == true && this.valuebottom == true && this.imgMsg == true) {
 					this.login = false;
 					this.loginIng = true;
 					this.veText = ""
 					var params = new URLSearchParams()
					params.append("telNumber", this.phone)
					params.append("verification", this.verification)
					params.append("verifyCode", this.picture)
 					axios.post("/api/bxd_inf_v2/inf/sys/login", params)
        			.then(function (response) {
        				if(response.status == 200) {
		        			if(response.data.errType == 1) {
		        				alert('手机号重复')
		        				this.login = true;
 								this.loginIng = false;
		        			}
		        			if(response.data.errType == 2){
		        				alert('验证码错误')
		        				this.login = true;
 								this.loginIng = false;
		        			}
		        			if(response.data.errType == 3){
		        				alert('验证码为空')
		        				this.login = true;
 								this.loginIng = false;
		        			}
		        			if(response.data.succType == 3) {
		        				window.localStorage.lastId=response.data.param.token
		        				window.localStorage.phoneNum=response.data.param.telNumber
		        				this.login = true;
		        				this.$router.go(-1)
		        			}
                		}
        			}.bind(this))
		        	.catch(function (error) {
		            	console.log(error);
		        	});
 				}else {
 					this.veText = "您还有未完善的信息"
 				}
 			},
 			handchangeImg() {   //点击倒计时
 					this.showTrue = true;
 					if(this.valuetop == false) {
 						alert("手机号为空或为错误")
 						this.showTrue = false;
 					}
	 				const timeConst = 60;
	 				if(this.valuetop == true && !this.timer) {
	 					var params = new URLSearchParams()
						params.append("telNumber",this.phone)  // 手机号
						params.append("verifyCode",this.picture)	//图片验证码
	 					axios.post("/api/bxd_inf_v2/inf/sys/smsCode", params)  //给后端发送验证码
			        	.then(function (response) {
			        		console.log(response)
			        		if(response.status == 200) {
			        			this.showTrue = false;
			            		if(response.data.desc == "验证码请求频繁") {
			            			this.show = true;
			            			alert('验证码请求频繁')
			            		}
			            		if(response.data.imgMsg == "1") {
			            			this.show = false;
			            			this.showTrue = false;
			            			this.imgMsg = true;    //图片验证码
			            			this.count = timeConst;   //倒计时
			 						this.showFalse = true;
			 						this.timer = setInterval(() => {
						        		if (this.count > 0 && this.count <= timeConst) {
						             	this.count--;
						            	}else {
							               this.showFalse = false;
							               this.show = true;
							               clearInterval(this.timer);
							               this.timer = null;
						            	}
				        			}, 1000)
			            		}
			            		if(response.data.imgMsg == "2") {
			            			this.imgMsg = false;
			            			alert("验证码为空")
			            		}
			            		if(response.data.imgMsg == "0") {
			            			this.imgMsg = false;
			            			alert("验证码错误")
			            			this.handleChangeImg()
			            		}
			            		if(response.data.imgMsg == "3") {
			            			this.imgMsg = false;
			            			alert("手机号重复")
			            		}
			                }
			        	}.bind(this))
			        	.catch(function (error) {
			            	console.log(error);
			        	});

	 				}

 			}

			
 		}
	}
</script>


<style scoped>
		.login {
			background: #fff;
		}
		.login-logo {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 4rem;
			background: #fff;
		}
		.login-logo-img {
			height: 1.67rem;
		}
		.checkbox {
			border-radius: 0% 0%;
		}
		.login-details {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.login-phone {
			display: flex;
			justify-content: space-between;
			width: 5.28rem;
			margin-bottom: 0.2rem;
			height: 0.78rem;
			border: 1px solid #e69c36;
			border-radius: 0.1rem
		}
		.login-phone-number {
			display: inline-block;
			height: 100%;
			width: 1.38rem;
			color: #040404;
			font-size: 0.25rem;
			text-align: left;
			padding-left: 0.2rem;
			line-height: 0.78rem;
		}
		.phone-value {
			border: 0;
			flex: 1;
		}
		/* img */
		.code-is-True {      /* 图片验证码 */
			position: relative;
			width: 100%;
			height: 100%;
		}
		.code-img {
			right: 0.12rem;
			top: 50%;
			margin-top: -0.27rem;
			position: absolute;
			width: 1.5rem;
			height: 0.54rem;
			border-radius: 0.15rem;
		}
		.login-Verification-img {
			position: relative;
			display: flex;
			width: 5.28rem;
			margin-top: 0.2rem;
			margin-bottom: 0.2rem;
			height: 0.78rem;
			border: 1px solid #e69c36;
			border-radius: 0.1rem
		}
		.login-Verification {
			display: inline-block;
			height: 100%;
			width: 1.38rem;
			color: #040404;
			font-size: 0.25rem;
			text-align: left;
			padding-left: 0.2rem;
			line-height: 0.78rem;
		}
		.Verification-img {
			right: 0.12rem;
			top: 50%;
			margin-top: -0.27rem;
			position: absolute;
			width: 1.5rem;
			height: 0.54rem;
			border-radius: 0.15rem;
			text-align: center;
			line-height: 0.54rem;
			background: #e69b35;
			color: #fff;
			font-size: 0.25rem;
		}
		.Verification-value {
			border: 0;
			width: 2.1rem;
			box-sizing: border-box;
		}
		.login-Verification-checkbox {
			width: 5.28rem;
			height: 0.51rem;
			color: #666;
		}
		.login-button {
			width: 5.28rem;
			height: 0.78rem;
			margin-top: 0.4rem;
			background: #e69c36;
			border-radius: 0.1rem;
			text-align: center;
			line-height: 0.78rem;
			color: #fff;
			font-size: 0.3rem;
		}
		.phone-prompt {
			height: 0.3rem;
			color: red;
		}
		.verificationText {
			height: 0.3rem;
			color: red;
		}

		.CountDown {
			opacity: 0.5!important;
		}
</style>
