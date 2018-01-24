<template>
	<div class="commentList" ref="commentList">
	    <div class="details-head">
            <!-- <img class="details-head-img" @click="handleReturnRouter" :src="src.h"> -->
            <span class="details-head-teatle">评论列表</span>
        </div>
        <div class="displayNone">123123</div>
        <div>
            <div class="mechanism">
                <!-- <img :src="mechanism.iconUrl" class="mechanism-img">-->
                <span class="mechanism-name">小花贷款</span> 
            </div>
            <ul>
                <li>
                    <div class="evaluate-details">
                        <!-- <img class="evaluate-img" :src="src.userUrl" alt=""> -->
                        <span class="evaluate-user">176****6178</span>
                    </div>
                    <p class="content-evaluate">一气儿就是产品好好的没有办法,没有任何的问题完全ok很喜欢气儿就是产品好好的没有办法,没有任何的问题完全ok很喜欢气儿就是产品好好的没有办法,没有任何的问题完全ok很喜欢
                    </p>
                </li>

                
            </ul>
        </div>
	</div>
</template>

<script>
    import axios from "axios"
	export default {
		data() {
			return {

			}
		},
        mounted() {
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.commentList.style.height = h + 'px';
            this.GetCommentList()
        },
        methods: {
            GetCommentList() {
                var loanId = this.$route.query.loanId
                var params = new URLSearchParams()
                params.append("loanId", loanId)
                axios.post("/api/bxd_inf_v2/inf/bxd/getComment", params)  //给后端发送验证码
                    .then(function (response) {
                        if(response.status == 200) {
                            console.log(response)
                        }
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    }); 
            }
        }
	}
</script>


<style scoped>
    .commentList {
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
        color: #414141;
    }
    .displayNone {
        height: 1.2rem;
        background: #f8f8f8;
    }
    .evaluate-details {
        height: 1rem;
        background: red;
    }
</style>
