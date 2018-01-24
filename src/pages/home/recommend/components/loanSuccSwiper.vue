<template>
  <div class="home-loan-succ-swiper">
    	 <img class="swiper-logo" :src="loanSuccSwper.iconURL"> 
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-list">
            <swiper-slide class="stop-swiping" v-for="item in loanSuccSwper.tipsMsg" :key="item.id">
                <ul class="swiper-slide-list">
                    <li class="swiper-slide-item">
                        <span class="slide-list-name">{{item.client_name}}</span>在<span class="slide-list-company-name ">{{item.loan_name}}</span>成功借贷<span class="slide-list-quota">{{item.amount}}</span><span class="element">元</span>
                    </li>
                    <li class="slide-list-time">5分钟前</li>
                </ul>
            </swiper-slide>
        </swiper>
        
  </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    export default {
            props: ["loanSuccSwper"],
         	data() {
                return {
                    swiperOption: {
                            loop:true,
                            autoplay: 5000,
                            direction: 'vertical',
                            autoHeight: true,
                            observeParents: true,
                            autoplayDisableOnInteraction: false,
                            noSwiping:true,
                            noSwipingClass: 'stop-swiping'
                    }
                }
            },
            
            components: {
                    "swiper": swiper,
                    "swiper-slide": swiperSlide
            }
    }
</script>


<style scoped>
  	.home-loan-succ-swiper {
        display: flex;
        background: #fff;
        margin: 0 0.15rem;
        border-radius: 0.2rem 0.2rem 0 0;
        padding-bottom: 0.22rem;
    }
    .swiper-logo {
        height: 0.3rem;
        margin: 0.28rem 0.4rem 0 0.4rem;
    }
    .swiper-list {
        flex: 1;
        height: 0.6rem;
    }
    .swiper-slide-list {
        display: flex;
        padding-top: 0.3rem;
        font-size: 0.25rem;
        justify-content: space-between;
    }
    .element {
        font-size: 0.25rem;
    }
    .slide-list-name {
        color: #999999;
    }
    .slide-list-company-name {
        color: #f5b140;
    }
    .slide-list-quota {
        margin: 0 0.1rem;
        color: #ff1010;
    }
    .slide-list-time {
        margin-right: 0.3rem;
        color: #b3b3b3;
    }
    
</style>
