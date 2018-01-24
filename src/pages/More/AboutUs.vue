<template>
	<div>
        <div class="details-head">
            <img class="details-head-img" @click="details" :src="returnUrl">
            <span class="details-head-teatle">关于我们</span>
        </div>
        <div class="AboutUs">
            <textarea class="AboutUs-text" ref="textValue"  maxlength="120" placeholder="请详细描述您遇到的问题,您描述的越详细,我们越跟快的地帮助您贷到款。"></textarea>
        </div>
        <div class="img-code">
            <span class="login-Verification">图片验证码:</span>
            <input type="text" class="Verification-value" placeholder="请输入验证码" v-model="picture"/>
            <div class="code-img">
               <img class="code-is-True" :src="code" @click="handleImgCode">
            </div>
        </div>
        <div class="submit-smild">
            <div class="submit" @click="submit">提交</div>
        </div>
	</div>

        

</template>

<script>
    import axios from "axios"
	export default {
        data() {
            return {
                AboutUsVue: "",
                code: "",
                returnUrl: "",
                picture: ""
            }
        },
        mounted() {
            this.getCodeImg()
        },
		methods: {
            getCodeImg() {
               axios.post("/api/bxd_inf_v2/inf/sys/loginPage")
                .then(function (response) {
                    if(response.status == 200) {
                        let code = response.data.imgCode  //logo
                        let returnUrl = response.data.returnUrl
                        this.code = code;
                        this.returnUrl = returnUrl;
                    }
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
            },
            handleImgCode() {
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
                    var token = window.localStorage.lastId
                    var params = new URLSearchParams()
                    params.append("scontent", this.$refs.textValue.value)
                    params.append("token", token)
                    params.append("verifyCode", this.picture)
                    axios.post("/api/bxd_inf_v2/inf/sys/feedback", params)  //给后端发送验证码
                    .then(function (response) {
                        if(response.status == 200) {
                            if(response.data.typeMsg == "0") {
                                alert("用户未登录")
                                this.$router.go(-1)
                                return 0
                            }
                            if(response.data.typeMsg == "1") {
                                alert("验证码错误")
                                return 0
                            }
                            if(response.data.typeMsg == "3") {
                                alert("验证码为空或则内容为空")
                            }
                            if(response.data.typeMsg == "2") {
                                alert("反馈成功,感谢您的反馈")
                                this.$router.go(-1)
                            }
                        }
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
           },
           details() {
                this.$router.go(-1)
           }
		}

	}
</script>


<style scoped>
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
        .AboutUs {
            box-sizing: border-box;
            padding: 0.2rem;
        }
        .AboutUs-text {
            width: 100%;
            box-sizing: border-box;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            margin-top: 1rem;
            height: 4rem;
            border: 0;
            border-radius: 0.1rem
        }
        .submit-smild {
            position: absolute;
            bottom: 0.4rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .submit {
            border-radius: 0.15rem;
            text-align: center;
            line-height: 0.7rem;
            width: 6.3rem;
            height: 0.7rem;
            background: #f29700; 
            color: #fff; 
        }
        .img-code {
            display: flex;
            justify-content: center;
            align-items: center;
            /* background: #fff; */
            height: 4rem;
        }
        .Verification-value {
            border: 0;
            width: 3.1rem;
            box-sizing: border-box;
            height: 0.6rem;
            padding-left: 0.2rem;
            margin-left: 0.2rem;
            margin-right: 0.4rem;
        }
        .code-is-True {
            height: 0.6rem;
            width: 1.5rem;
        }
</style>
