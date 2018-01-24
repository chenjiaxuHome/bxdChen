<template>
	<div class="comment" ref="comment">
		<div class="details-head">
            <img class="details-head-img" :src="returnImg.returnUrl" @click="handleReturn">
            <span class="details-head-teatle">发表评价</span>
            <span class="details-head-text" v-show="show" @click="handleRelease">发布</span>
            <span class="details-head-text" v-show="!show">正在发布</span>
        </div>
        <div class="display-none"></div>
        <div class="mechanism">
            <img :src="mechanism.iconUrl" class="mechanism-img">
            <span class="mechanism-name">{{mechanism.loanName}}</span>
        </div>
        <div class="comment-text">
             <textarea class="AboutUs-text" ref="textValue"  maxlength="200" placeholder="贷款满足您的期望吗?说说它的优点和美中不足的地方吧。"></textarea>
        </div>
	</div>
</template>

<script>
    import axios from "axios"
    import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
                returnImg: {},
                mechanism: {},
                show: true
			}
		},
        mounted() {
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.comment.style.height = h + 'px';
            this.comment()
        },
        methods: {
            comment() {
                var loanId = this.$route.query.loanId
                
                axios.get("/api/bxd_inf_v2/inf/sys/getCommentMsg?loanId="+loanId+"")
                    .then((response) => {
                    if(response.status == 200 ) {
                        console.log(response)
                        this.returnImg = response.data.imgUrl
                        this.mechanism = response.data.commentDesc
                    }
                })
            },
            handleReturn() {
                this.$router.go(-1)
            },
            handleRelease() {
                this.show = false
                var progressId = this.$route.query.progressId
                var token = window.localStorage.lastId
                var loanId = this.$route.query.loanId
                var params = new URLSearchParams()
                params.append("token", token)
                params.append("progressId", progressId)
                params.append("loanId", loanId)
                params.append("scontent", this.$refs.textValue.value)
                axios.post("/api/bxd_inf_v2/inf/sys/setCommentMsg", params)  //给后端发送验证码
                    .then(function (response) {
                        if(response.status == 200) {
                            console.log()
                            if(response.data.errType == "0") {
                                alert("提交内容为空")
                                this.show = true
                            }else {
                                alert("谢谢您的评论")
                                this.$router.go(-1)
                                this.show = true
                            }   
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
    /* .comment {
        background: #fff;
    } */
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
    .details-head-text {
        position: absolute;
        right: 0;
        line-height: 1rem;
        padding-right: 0.2rem;
        font-size: 0.28rem;
        color: #d76c00;
    }
    .display-none {
        height: 1.2rem;
        background: #f8f8f8;
    }
    .mechanism {
        background: #fff;
    }
    .comment-text {
            box-sizing: border-box;
            padding: 0.2rem;
    }
    .AboutUs-text {
        width: 100%;
        box-sizing: border-box;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        padding-top: 0.2rem;
        height: 4rem;
        border: 0;
        border-radius: 0.1rem
    }
    .mechanism-img {
        height: 1rem;
        padding-left: 0.2rem;
        border-radius: 50%;
    }
    .mechanism-name {
        line-height: 1rem;
        margin-left: 0.4rem;
        font-size: 0.35rem;
    }
</style>
