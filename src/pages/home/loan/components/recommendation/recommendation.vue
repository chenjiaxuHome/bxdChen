<template>
        <div>
         	<ul class="load-list">
         		<li class="load-item one" @click="handleSmallLoan">7天小额周转</li>
         		<li class="load-item two" @click="handleIdcardLoan">有身份证手机号就能贷</li>
         		<li class="load-item three" @click="handleFaceLoan">人脸识别，征信良好就能贷</li>
         		<li class="load-item four" @click="handleAlipayLoan">有支付宝淘宝就能贷</li>
         	</ul>
        </div>
</template>

	<script>
		export default {
			methods: {
                handleSmallLoan() {
                    this.$router.push({
                        path: '/loan',
                        query: {
                            parameter: "seven_status",
                            listPosition: "recom"
                        }
                    })
                },
                handleIdcardLoan() {
                    this.$router.push({
                        path: '/loan',
                        query: {
                            parameter: "idcard_status",
                            listPosition: "recom"
                        }
                    })
                },
                handleAlipayLoan() {
                    this.$router.push({
                        path: '/loan',
                        query: {
                            parameter: "alipay_status",
                            listPosition: "recom"
                        }
                    })
                },
                handleFaceLoan() {
                    this.$router.push({
                        path: '/loan',
                        query: {
                            parameter: "face_status",
                            listPosition: "recom"
                        }
                    })
                }
            }
		}
	</script>


<style scoped>
  	.load-list {
  		display: flex;
  		flex-direction: column;
  		align-items: center;
  		margin-top: 1.8rem;
        background: #eee;
  	}
  	.load-item {
  		width: 6.6rem;
  		height: .8rem;
  		text-align: center;
  		line-height: .8rem;
  		color: #fff;
  		border-radius: 0.5rem;
  		margin-bottom: 0.55rem;
        font-size: 0.3rem;
  	}
   .one {
  		background: #e59b35;
  	}
  	.two {
  		background: #91ccf0;
  	}
  	.three {
  		background: #e5a3c1;
  	}
  	.four {
  		background: #94cac8;
  	}
</style>
