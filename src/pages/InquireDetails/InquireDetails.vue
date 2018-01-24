<template>
	<div class="query" ref="query">
		<div class="details-head">
            <img class="details-head-img" :src="ifformation.returnUrl" @click="handleReturn">
            <span class="details-head-teatle">进度查询</span>
        </div>
        <div class="query-top"></div>
        <ul class="query-list" >
            <li class="query-item">
                <img class="query-item-img" :src="ifformation.icon_url">
                <ul class="query-query">
                    <li class="query-query-name">{{ifformation.loan_name}}</li>
                    <li class="query-query-ipone">咨询电话 {{ifformation.mgt_phone}}</li>
                </ul>
                <a :href="'tel:' +  ifformation.mgt_phone ">
                <img class="query-item-img-phone" :src="ifformation.callUrl">
                </a>
            </li>
        </ul>
        <div class="query-center"></div>
        <div class="confirmed">
            <img class="confirmed-img" :src="ifformation.detailUrl">
            <span class="confirmed-text">{{text}}</span>
            <span v-show=show class="confirmed-Explain">请耐心等待,也可以登录网址查询</span>
        </div>

        <ul class="inputrouter">
            <a :href="ifformation.link_url">
                <li class="inputrouter-item" @click="handleTouter" ref="router">快速进入{{ifformation.loan_name}}贷查询结果</li>
            </a>
            <a :href="'tel:' +  ifformation.mgt_phone ">
                <li class="inputrouter-item" @click="handlephone" ref="phone">打电话询问</li>
            </a>
            <li class="inputrouter-item" v-show="comment" @click="handUserComment">评论</li>
            <li class="inputrouter-item" v-show="!comment">已评论</li>
        </ul>

        <div class="bottom-query" v-show="trueShow" @click="bottomQuery">
            确认收到货款
        </div>
        <div class="bottom-query-False" v-show="falseShow">
            已确认
        </div>
	</div>
</template>

<script>
    import axios from "axios"
    import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
                ifformation: {},
                phoneNum: "17600096178",
                text: "待确认",
                show: true,
                trueShow: true,
                falseShow: false,
                loanId: "",
                comment: true,
                isComm: ""
			}
		},
        mounted() {

            var state = this.$route.query.status
            if(state == true) {
                this.trueShow = false;
                this.falseShow = true;
                this.show = false;
                this.text = "已确认";
            }
            

            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.query.style.height = h + 'px';

            this.gettokenValue();
        },
		methods: {

            gettokenValue() {
                var loanId = this.$route.query.loanId
                var progressId = this.$route.query.progressId
                axios.get("/api/bxd_inf_v2/inf/sys/getRecordById?loanId="+loanId+"&progressId="+progressId+"")
                    .then((response) => {
                    if(response.status == 200 ) {
                        console.log(response)
                        this.ifformation = response.data.item
                        console.log(response.data.param.loanId)
                        this.loanId = response.data.param.loanId

                        if(response.data.item.isComm == false) {
                            this.comment = true;
                        }else {
                            this.comment = false;
                        }
                    }
                })
            },
			handleReturn() {
                this.$router.go(-1)
            },

            handleTouter() {
                this.$refs.router.style.color = "#21ade8"
                this.$refs.phone.style.color = "#000"
            },
            handlephone() {
                this.$refs.phone.style.color = "#21ade8"
                this.$refs.router.style.color = "#000"
            },
            bottomQuery() {
                alert('用户已经确认')
                this.trueShow = false;
                this.falseShow = true;
                this.show = false;
                this.text = "已确认"
                let loanId = this.loanId;
                let token = window.localStorage.lastId
                axios.get("/api/bxd_inf_v2/inf/sys/confirm?loanId="+loanId+"&token="+token+"")
                    .then((response) => {
                    if(response.status == 200 ) {
                       
                    }
                })
            },
            handUserComment() {
                var loanId = this.$route.query.loanId
                var progressId = this.$route.query.progressId
                this.$router.push({
                        path: '/comment',
                        query: {
                            loanId: loanId,
                            progressId: progressId
                        }
                })
            }
		}
	}
</script>


<style scoped>
    .query {
        background: #fff;
    }
    .query-top {
        height: 1.2rem;
        background: #f0f0f0;
    }
    .query-center {
        height: 0.2rem;
        background: #f0f0f0;
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
    
    .query-list {
        /* padding-top: 1.2rem; */
        border-bottom: 1px solid #eee;
    }
    .query-item {
        display: flex;
        height: 1.6rem;
        background: #fff;
        justify-content: space-between;
        align-items: center;
    }
    .query-item-img {
        height: 1rem;
        border-radius: 50%;
       padding: 0 0.3rem;
    }
    .query-query {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .query-query-name {
        font-size: 0.35rem;
        padding-bottom: 0.2rem;
        color: #000;
    }
    .query-query-ipone {
        padding-top: 0.2rem;
        font-size: 0.3rem;
        color: #222;
    }
    .query-item-img-phone {
        height: 0.7rem;
        padding-right: 0.3rem;
    }
    .confirmed {
        height: 3rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .confirmed-img {
        height: 1.3rem;
    }
    .confirmed-text {
        padding-top: 0.5rem;
        font-size: 0.4rem;
    }
    .confirmed-Explain {
        padding-top: 0.2rem;
        font-size: 0.2rem;
        color: #777777;
    }
    .inputrouter {
        height: 4rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .inputrouter-item {
        height: 0.8rem;
        width: 5rem;
        color: #000;
        border: 1px solid #999;
        text-align: center;
        line-height: 0.8rem
    }
    .bottom-query {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: 0.3rem;
        color: #fff;
        background: #e59b35;
    }
    .bottom-query-False {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: 0.3rem;
        color: #fff;
        background: #6e6e6e;
    }
</style>
