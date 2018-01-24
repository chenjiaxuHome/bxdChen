<template>
  <div>
    	<ul class="home-loan-options">
      		<!-- <li class="home-loan-list loan-list-one" @click="handleSmallLoan">
            <p class="home-loan-list-top">微额贷</p>
            <span>1百~2千</span>
          </li> -->
      		<li class="home-loan-list loan-list-two" @click="smileLoan">
      			<p class="home-loan-list-top">小额贷</p>
      			<span>500百~1万</span>
      		<li class="home-loan-list loan-list-three" @click="PaidLoan">
      			<p class="home-loan-list-top" >工薪贷</p>
      			<span>1万~5万</span>
      		</li>
      		<li class="home-loan-list loan-list-four" @click="bigLoan">
      			<p class="home-loan-list-top" >大额贷</p>
      			<span>5万~50万</span>
      		</li>
    	</ul>
  </div>
</template>

<script>
export default {
     	methods: {
            /*handleSmallLoan() {
                this.$router.push({
                        path: '/loan',
                        query: {
                            parameter: "0",
                        }
                })
            },*/
            smileLoan() {
                this.$router.push({
                        path: '/loan',
                        query: {
                            parameter: "1",
                        }
                })
            },
            PaidLoan() {
                this.$router.push({
                        path: '/loan',
                        query: {
                            parameter: "2",
                        }
                })
            },
            bigLoan() {
                this.$router.push({
                        path: '/loan',
                        query: {
                            parameter: "3",
                        }
                })
            }
        }
}
</script>


<style scoped>
  	.home-loan-options {
  		display: flex;
  		justify-content: space-between;
  		margin:0.15rem 0.15rem;
  	}
  	.home-loan-list {
  		display: flex;
  		flex-direction: column;
        align-items: center;
        justify-content: center;
  		height: 1rem;
  		width: 2.3rem;
  		background: red;
  		color: #fff;
  		font-size: 0.22rem; 
  		border-radius: 0.08rem
  	}
  	.home-loan-list-top {
  		margin-bottom: 0.16rem;
  	}
  	.loan-list-one {
  		background: #ffbd00;
  	}
  	.loan-list-two {
  		background: #7ecef4;
  	}
  	.loan-list-three {
  		background: #f19ec2;
  	}
  	.loan-list-four {
  		background: #89c997;
  	}
</style>
