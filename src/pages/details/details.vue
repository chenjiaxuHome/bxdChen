<template>
  <div class="details">
        <div class="details-head">
            <img class="details-head-img" @click="handleReturnRouter" :src="src.h">
            <span class="details-head-teatle">贷款详情</span>
        </div>
    <div class="details-position">
        <div class="details-center">
            <div class="details-loan">
                <img class="details-loan-img" :src="recommenddation.iconURL">
                <div class="details-specific-text">
                    <ul class="specific-list">
                        <li class="specific-item">
                            <span class="success-rate">成功率</span>
                            <span class="success-rate-num">{{recommenddation.succValue}}</span>
                        </li>
                        <li class="specific">
                            <span class="apply">申请人数</span>
                            <span class="apply-numb">{{recommenddation.snum}}</span>
                        </li>
                    </ul>
                    <p class="detailed">{{recommenddation.introduction}}</p>
                </div>
            </div>
            <div class="scope-loan">
                <ul class="scope-loan-list">
                    <li class="scope-loan-item">
                        <img class="scope-loan-item-img" :src="src.qian">
                        <span class="scope-loan-item-range">贷款范围:</span>
                        <span class="scope-loan-item-number">{{recommenddation.quotaValue}}</span>
                    </li>
                    <li class="scope-loan-item">
                        <img class="scope-loan-item-img" :src="src.time">
                        <span class="scope-loan-item-range">贷款期限:</span>
                        <span class="scope-loan-item-number">{{recommenddation.cycleValue}}</span>
                    </li>
                </ul>
                <ul class="scope-loan-input">
                    <li class="scope-loan-input-list">
                        <input class="scope-loan-input-numb" v-model="recommenddation.loanStart"  type="text" />
                        <span class="scope-loan-input-text-left">元</span>
                    </li>
                    <li class="scope-loan-input-list scope-two-list">
                    <!-- 点击弹出 -->
                        
                        <div class="scope-loan-input-day" @change="handleChangeValue" @click="handleClick">
                            {{value}}
                            <span class="Triangle"></span>
                        </div>
                        <span class="scope-loan-input-text">{{recommenddation.repayDateType}}</span>
                    </li>
                </ul>

                <ul class="scope-loan-details">
                    <li class="scope-loan-lists scope-loan-day">
                        <span class="scope-loan-lists-number">{{ repayment }}元</span>
                        <span class="scope-loan-lists-day">{{recommenddation.repayDateType}}还款</span>
                    </li>
                    <li class="scope-loan-lists scope-loan-total">
                        <img class="list-item-img left" :src="src.k">
                        <span class="scope-loan-lists-number">{{ TotalInterest }}元</span>
                        <span class="scope-loan-lists-day">总利息</span>
                        <img class="list-item-img right" :src="src.k">
                    </li>
                    <li class="scope-loan-lists loan-interest-rate">
                        <span class="scope-loan-lists-number">{{recommenddation.RateValue}}%</span>
                        <span class="scope-loan-lists-day">{{recommenddation.Rate}}</span>
                    </li>
                </ul>
            </div>
        </div> 
        <div class="details-condition">
            <div class="condition-list" v-show="reminder_desc">
                <div>
                    <img :src="src.bian">
                    <span class="tongText">关键提醒</span>
                </div>
                <ul class="real-name-authentication">
                    <li class="real-name-authentication-item" v-for="item in recommenddation.reminder_desc">{{item}}</li>
                </ul>
            </div>
            <div class="condition-list" v-show="audit_desc">
                <div>
                    <img class="condition-list-img" :src="src.bian">
                    <span class="tongText">审核说明</span>
                </div>
                <ul class="condition-list-explain">
                    <li class="condition-explain" v-for="item in recommenddation.audit_desc">{{item}}</li>
                </ul>
            </div>
            <div class="condition-list" v-show="apply_process">
                <div>
                    <img class="condition-list-img" :src="src.bian">
                    <span class="tongText">申请流程</span>
                </div>
                <ul class="condition-list-process">
                    <li class="condition-list-process-text" v-for="item in recommenddation.apply_process">{{item}}<span class="condition-arrow">></span></li>
                </ul>
            </div>
            <div class="condition-list" v-show="apply_condition">
                <div>
                    <img class="condition-list-img" :src="src.bian">
                    <span class="tongText">申请条件</span>
                </div>
                <p class="condition-list-stable">{{recommenddation.apply_condition}}</p>
            </div>

            <div class="condition-list" v-show="mgt_description">
                <div>
                    <img class="condition-list-img" :src="src.bian">
                    <span class="tongText">详细介绍</span>
                </div>
                <p class="condition-list-item">{{recommenddation.mgt_description}}</p>
            </div>
            
            <div class="condition-list">
                <div>
                    <img class="condition-list-img" :src="src.bian">
                    <span class="tongText">贷款评价</span>
                </div>
                <div @click="handleEvaluateList" v-show="evaluateList">
                    <div class="evaluate-details" >
                        <img class="evaluate-img" :src="commentMsg.userImg" alt="">
                        <span class="evaluate-user">{{tel}}</span>
                    </div>
                    <p class="content-evaluate">{{commentMsg.comment}}</p>
                    <div class="see-all">
                        <span class="see-all-text">{{commentMsg.desc}}</span>
                    </div>
                </div>
                <div v-show="!evaluateList" class="evaluate-list-show">
                    暂无评价
                </div>
            </div>

        </div> 
    </div>
        <div class="details-bottom">
                <div class="button" @click="handleApply">立即申请</div>
        </div>
        <div class="big" v-show="big" @click="bighid"></div>
        <mt-popup
            class="popup"
            v-model="popupVisible"
            position="bottom">
            <div class="taber">
                <span class="cancel" @click="shut">取消</span>
                <span @click="changenumber" class="determine">确定</span>
            </div>
            <mt-picker 
                :slots="slots"
                @change="onValuesChange"
                class="picker"
                >
            </mt-picker> 
        </mt-popup>
        
  </div>
        
</template>

<script> 
    import axios from "axios"
    export default {
        data() {
            return {
                recommenddation: [],
                commentMsg: {},
                value: '',
                popupVisible: false,
                item: "",
                src: {
                    h: "",
                    k: "",
                    qian: "",
                    time: "",
                    bian: "",
                    userUrl: ""
                },
                link: "",
                slots:[{values: []}],
                reminder_desc: false,
                audit_desc: false,
                apply_process: false,
                apply_condition: false,
                mgt_description: false,
                big: false,
                evaluateList: false,   //评论是否显示隐藏
                aaa: {
                    active: 1,
                    type: "NewArrivals",
                    option: 1
                },
                bbb: {
                    active: 2,
                    type: "CreditCardLoan",
                    option: 2
                },
                ccc: {
                    active: 0,
                    type: "PopularRecommendation",
                    option: 0
                },
                current: "",
                tel: ""

            }
            
        },

        mounted() {
                this.PostDetailsData()   
        },

        computed: {   //计算属性 计算input的值
                TotalInterest: function() {
                     if((""+this.recommenddation.loanStart).length <= 22){
                            
                                if((this.recommenddation.loanStart * this.recommenddation.RateValue/100 * this.value).toFixed(1)=="NaN") {
                                    return 0
                                }else {
                                   return (this.recommenddation.loanStart * this.recommenddation.RateValue/100 * this.value).toFixed(1)
                                }

                        }else {
                            return 0
                        }
                },
                repayment: function() {
                        if( (""+this.recommenddation.loanStart).length <= 22 ) {
                                if( ( (Number( this.recommenddation.loanStart )+Number( this.recommenddation.RateValue/100 ) ) / this.value ) .toFixed(1) == "NaN") {
                                    return 0
                                }else {
                                    return ( (Number( this.recommenddation.loanStart )+Number( this.recommenddation.RateValue/100 ) ) / this.value ) .toFixed(1)
                                }
                             
                        }else {
                            return 0
                        }
                    
                }
        },

        methods: {

                handleClick() {
                    this.popupVisible = true    //打开弹出框
                    this.big = true;
                },

                onValuesChange(picker,values) {

                    this.item = values[0]   //通过change事件存一个数据

                },

                changenumber() {
                    this.value = this.item; //点击的时候附给页面上面的数据
                    this.popupVisible = false;  //关闭弹出框
                    this.big = false;
                },

                shut() {
                    this.value = this.item;
                    this.popupVisible = false;  //关闭弹出框
                    this.big = false;  
                },

                handleApply() { //button 跳转
                    window.location.href = this.link
                },

                handleReturnRouter() {  //点击返回上一页
                    if(this.current == 1) {
                        this.$router.push({path: "/",  query: { 
                                plan: this.ccc
                            }
                        })
                    }

                    if(this.current == 2) {
                        this.$router.push({path: "/",  query: { 
                                plan: this.aaa
                            }
                        })
                    }

                    if(this.current == 3) {
                        this.$router.push({path: "/",  query: { 
                                plan: this.bbb
                            }
                        })
                    }

                    if(this.current == "search") {
                        this.$router.go(-1)
                    }

                    if(this.current == "loan") {
                        this.$router.go(-1)
                    }
                    
                },

                bighid() {
                    this.value = this.item;    //全局的隐形框
                    this.popupVisible = false;  //关闭弹出框
                    this.big = false    //关闭透明的div
                },

                handleChangeValue() {
                    alert(123)
                },

                PostDetailsData() {
                    let loanId = this.$route.query.loanId    //跳转路由之后取到loanId
                    let current = this.$route.query.listPage  //带的那个页面的参数
                    axios.get("/api/bxd_inf_v2/inf/bxd/detail?loanId="+loanId+"")
                    .then(function (response) {
                            let res = response.data.items;
                            let value = this.slots;
                            if(response.data.commentMsg.desc == "暂时没有评论") {
                                this.evaluateList = false;  //如果没有评论
                            }else {
                                this.evaluateList = true; //有
                            }
                            this.commentMsg = response.data.commentMsg    //评论
                            if(this.commentMsg.tel) {   //判断有没有手机号
                                var tel=this.commentMsg.tel;
                                this.tel = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'); //手机号变成
                            }
                            value.forEach(function(item){  //改变弹出框的值
                                item.values = res.repayDateShare
                                this.value = item.values[0]
                            }.bind(this))

                            this.recommenddation = res
                            this.src.qian = this.recommenddation.imgUrl.amountUrl  //图片
                            this.src.h =  this.recommenddation.imgUrl.reUrl
                            this.src.time =  this.recommenddation.imgUrl.timeUrl
                            this.src.bian = this.recommenddation.imgUrl.edgeUrl
                            this.src.k = this.recommenddation.imgUrl.lineUrl
                            this.link = this.recommenddation.linkURL
                            this.src.userUrl = this.recommenddation.imgUrl.userUrl
                            this.current = current;
                            this.showData() //判断是否显示dom

                    }.bind(this)).catch(function (error) {
                    　　console.log(error);
                    });
                },
                showData() {
                    if(!this.recommenddation.reminder_desc == "") {
                        this.reminder_desc = true
                    }
                    if(!this.recommenddation.audit_desc == "") {
                        this.audit_desc = true
                    }
                    if(!this.recommenddation.apply_process == "") {
                        this.apply_process = true
                    }
                    if(!this.recommenddation.apply_condition == "") {
                        this.apply_condition = true
                    }
                    if(!this.recommenddation.mgt_description == "") {
                        this.mgt_description = true
                    }
                },
                handleEvaluateList() {
                    let loanId = this.$route.query.loanId    //跳转路由之后取到loanId
                    this.$router.push({path: "/commentList",query: {
                        loanId: loanId
                        } 
                    })
                    
                }
        }
    }

</script>


<style scoped>
    .details {
        -webkit-overflow-scrolling: touch;
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
    .details-loan {
        display: flex;
        padding: 0.4rem 0.2rem;
    }
    .details-loan-img {
        border-radius: 50%;
        height: 1.2rem;

        margin-right: 0.67rem;
    }
    .details-specific-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
    }
    .specific-list {
        display: flex;
        justify-content: space-between;
    }
    .specific {
        margin-right: 0.4rem;
    }
    .success-rate {
        margin-right: 0.15rem;
        color: #999999;
    }
    .apply {
        margin-right: 0.15rem;
        color: #999999;
    }
    .success-rate-num {
        font-size: 0.35rem;
        color: #ea3621;
    }
    .apply-numb {
        font-size: 0.35rem;
        color: #ea3621;
    }
    .detailed {
        padding-top: 0.2rem;
        color: #999999;
    }
    /* zhongjian */
    .scope-loan {
        margin: 0 0.2rem;
        background: #fff;
        border: 1px solid #b5b5b5;
        border-radius: 0.1rem

    }
    .scope-loan-list {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0.32rem 0 0.32rem;
    }
    .scope-loan-item-img {
        height: 0.32rem;
        margin-right: 0.12rem;
    }
    .scope-loan-item-range {
        font-size: 0.25rem;
    }
    .scope-loan-item-number {
        font-size: 0.25rem;
    }
    .scope-loan-input {
        display: flex;
        height: 1.9rem;
        padding: 0 0.2rem;
        align-items: center;
        justify-content: space-around;
    }
    .scope-loan-input-numb {
        height: 0.6rem;
        width: 1.28rem;
        font-weight: 500;
        font-size: 0.35rem;
        text-align: center;
        line-height: 0.6rem;
        border: 0;
        border:1px solid #b5b5b5;
        border-radius: 0.1rem
    }
    .scope-loan-input-day {
        position: relative;
        height: 0.61rem;
        width: 1.29rem;
        font-weight: 500;
        font-size: 0.35rem;
        border: 1px solid #b5b5b5;
        text-align: center;
        line-height: 0.6rem;
        border-radius: 0.1rem;
    }
    .Triangle {
        position: absolute;
        top: 0.24rem;
        right: 0.13rem;
        width: 0;
        height: 0;
        border-left: .1rem solid transparent;
        border-right: .1rem solid transparent;
        border-top: .1rem solid #000;
    }
    .scope-two-list {
        display: flex;
        align-items: center;
    }
    .scope-loan-input-text {
        padding-left: 0.1rem;
    }
    .scope-loan-input-text-left {
        padding-left: 0.05rem;
    }
    .scope-loan-details {
        display: flex;
        background: #cec0a8;
        height: 0.85rem;
    }
    .scope-loan-lists {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
    }
    .list-item-img {
        height: 0.46rem;
        width: 0.01rem;
    }
    .left {
        position: absolute;
        top: 0.2rem;
        left: 0;
    }
    .right {
        position: absolute;
        top: 0.2rem;
        right: 0;
    }
    .scope-loan-total {
        position: relative;
    }
    .scope-loan-lists-number {
        font-size: 0.3rem;
    }
    .scope-loan-lists-day {
        font-size: 0.24rem;
        padding-top: 0.13rem;
    }
    .qwe {
        line-height: 0.2;
        background: #fff;
    }
    /* 条件 */
    .details-condition {
        background: #fff;
        padding: 0 0.1rem;
    }
    .condition-list {
        padding: 0.24rem 0 0.3rem 0;
    }
    .condition-list-img {
        padding-right: 0.14rem;
    }
    .real-name-authentication {
        display: flex;
        flex-wrap: wrap;
        margin-left: 0.18rem;
        margin-top: 0.25rem;
    }
    .real-name-authentication-item {
        border: 1px solid #e59b35;
        margin-left: 0.2rem;
        margin-top: 0.2rem;
        padding: 0.15rem 0.2rem 0.15rem 0.2rem;
        color: #e59b35;
        font-size: 0.24rem;
        border-radius: 0.1rem
    }
    .condition-list-explain {
        margin-top: 0.12rem;
        padding: 0 0.18rem;
        color: #999;
        font-size: 0.2rem;
    }
    .condition-explain {
        margin-top: 0.26rem;
        font-size: 0.25rem;
    }
    .condition-list-process-text {
        font-size: 0.25rem;
    }
    .condition-list-process {
        display: flex;
        padding: 0 0.18rem;
        margin-top: 0.3rem;
        flex-wrap: wrap;
        color: #999;
        font-size: 0.2rem;
    }
    .condition-arrow {
        padding: 0 0.09rem;
    }
    .condition-list-stable {
        margin-top: 0.3rem;
        font-size: 0.25rem;
        color: #999;
        line-height: 0.4rem;
        padding: 0 0.18rem;
    }
    .condition-list-item {
        margin-top: 0.3rem;
        padding: 0 0.18rem;
        font-size: 0.25rem;
        color: #999;
        line-height: 0.4rem;
    }
    .tongText {
        font-size: 0.3rem;
    }
    .details-bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button {
        width: 5.3rem;
        height: 0.7rem;
        background: #e59b35;
        text-align: center;
        line-height: 0.7rem;
        color: #fff;
        border-radius: 0.1rem;
    }
    .details-position {
        position: absolute;
        top: 1rem;
        right: 0;
        left: 0;
        bottom: 1.2rem;
        overflow-x:hidden;
        overflow-y:scroll;
    }
    /* 弹出框 */
    .popup {
        width: 100%;
    }
    .taber {
        height: 0.6rem;
        background: #f0f0f2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
    }
    .picker {
        width: 100%;
   }
    .determine {
        color: #4695d6;
    }
    /* big */
    .big {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: #000;
    }

    .evaluate-details {
        display: flex;
        align-items: center;
        margin: 0.2rem;
    }
    .evaluate-img {
        height: 0.5rem;
        border-radius: 50%;
    }
    .evaluate-user {
        font-size: 0.3rem;
        margin-left: 0.3rem

    }
    .content-evaluate {
        padding: 0 0.2rem;
        line-height: 0.26rem;
        font-size: 0.22rem;
    }
    .see-all {
        display: flex;
        justify-content: center;
        margin-top: 0.2rem;
    }
    .see-all-text {
        padding: 0.1rem;
        border: 1px solid #e59b35;
        font-size: 0.2rem;
        color: #e59b35;
        border-radius: 0.2rem
    }
    .evaluate-list-show {
        text-align: center;
        line-height: 0.8rem;
        margin-top: 0.2rem;
        font-size: 0.26rem;
        color: #999;
        border-radius: 0.1rem;
        border: 1px solid #999;
    }
</style>
<style>
    /* 下拉 */
    .picker-slot.picker-slot-center {
        width: 100%;
    }
    .picker-slot.picker-slot-center {
        background: #d1d4dd;
    } 
    .v-modal {
        opacity: 0!important;
        display: none!important;
    }
</style>