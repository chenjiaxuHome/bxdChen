<template>
  <div class="home" ref="home">
            <ul class="homg-tab" v-show="valuetab" >
                <li class="tab-option" v-for="(item, index) in tabs" @click="toggleTab(item.type, index)" :class="{active: active == index}">
                      <img class="home-tab-img" :src="item.flag ? item.src.iconURL1 : item.src.iconURL2" />
                      <span>{{item.view}}</span>
                </li>

            </ul>

            <prince :is="currentTab" keep-alive :swiper="swiper" :loanSuccSwper="loanSuccSwper"></prince>
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
            <div class="big" v-show="big" @click="bighid"></div>
  </div>
</template>

<script> 
	import recommend from './recommend/recommend';
	import loan from './loan/loan';
	import mymessage from './mymessage/mymessage';
	import { mapState, mapActions } from 'vuex'
	export default {
        data() {
            return {
                    valuetab: true,
                    big: false,
                    popupVisible: false,
                    slots:[{values: ['3天', '1周内', '1个月', '3个月', '6个月', '不限']}]
                }
            },
            computed: mapState({
                    tabs: (state) => {
                        return state.home.tabs
                    },
                    currentTab: (state) => {
                        return state.home.currentTab
                    },
                    active: (state) => {
                        return state.home.active
                    },
                    swiper: (state) => {
                        return state.home.swiper
                    },
                    loanSuccSwper: (state) => {
                        return state.home.loanSuccSwper
                    }

            }),
     		components: { // 声明子组件
      		        "recommend": recommend,
      		        "loan": loan,
      		        "mymessage": mymessage
     		},
            mounted (){
                    let a = this.$route.query.plan
                    let tuijian = this.$route.query.currentTab
                    if(typeof(tuijian)=="object") {
                        bus.$emit("changeTuijian", tuijian)
                    }
                    if(typeof(a)=="object") {
                        bus.$emit("aaa", a)
                        console.log(a)
                    }
            
                    !this.swiper.length && this.getHomeData();  //判断加载还是不加载数据

                    bus.$on("tabBottomTrue", function(){   //监听到之后关闭tab
                        this.valuetab = true;
                    }.bind(this))

                    bus.$on("handleClickpupup", function(){   //监听到之后关闭tab
                        this.popupVisible = true    //打开弹出框
                        this.big = true;
                        this.valuetab = false;  //关tab
                    }.bind(this))
                   
            },
      	    methods: {

                    getHomeData() {
                        this.$store.dispatch('SgetHomeData')
                    },

                    toggleTab (tab, i) {
                        console.log(i)
                        this.$store.commit('increment', {
                            tabname: tab,
                            index: i
                        })
                    },

                    onValuesChange(picker,values) {  //这是弹出框
                        this.item = values[0]//通过change事件存一个数据
                    },

                    changenumber(e) {
                        bus.$emit("value", this.item)
                        this.popupVisible = false;  //关闭弹出框
                        this.valuetab = true;    //触发事件关闭底部框
                        this.big = false
                    },

                    shut() {
                        this.popupVisible = false;  //关闭弹出框
                        this.valuetab = true;
                        this.big = false
                    },

                    bighid() {
                        this.popupVisible = false;  //关闭弹出框
                        this.valuetab = true;
                        this.big = false
                    }
                  
              }
	}

</script>


<style scoped>
    .home {
        background: #f0f0f0;
    }
    .homg-tab {
        position: fixed;
        bottom: 0;
        z-index: 1; 
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 1rem;
        background: #fff;
    }
    .tab-option {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .home-tab-img {
        width: 0.39rem;
        height: 0.39rem;
        margin-bottom: 0.08rem;
    }
  	.active {
        color: #e59b36;
    }
    /* 弹出框 */
    .popup {
        width: 100%;
        position:fixed;
        z-index: 99999!important;
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
    .big {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: #000;
    }
</style>

