<template>
  <div class="home-reserved-space">
        <swiper :options="swiperOption" class="swiper-home" ref="mySwiper">
            <swiper-slide class="stop-swiping" v-for="item in swiper" :key="item.loan_id">
                <div class="img-box">
                    <a :href="item.link_action">
                        <img class="swiper-img" :src="item.imgURL" />
                    </a>
                </div>
            </swiper-slide>
            <div class="home-swiper-pagination"  slot="pagination"></div>
        </swiper>
  </div>

</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    export default {
       props: ["swiper"],
        data() {
            return {
                swiperOption: {
                    autoplay: 3000,
                    direction: 'horizontal',
                    autoHeight: true,
                    pagination: '.home-swiper-pagination',
                    bulletClass: 'home-swiper-bullet',
                    bulletActiveClass: 'home-swiper-bullet-active',
                    observeParents: true,
                    autoplayDisableOnInteraction: false
                }
            }
        },
        components: {
            swiper: swiper,
            "swiper-slide": swiperSlide
        }

    }
</script>


<style scoped>
    .home-reserved-space {
        height: 3.5rem;
    }
    .img-box {
        height: 3.5rem;
        width: 100%;
    }
    .swiper-img {
        width: 100%;
        height: 3.5rem;
    }
    .swiper-home {

    }
</style>
<style type="text/css">
    .home-swiper-pagination {
        position: absolute;
        bottom: 0rem;
        height: 0.2rem;
        z-index: 99999;
        text-align: center;
    }
    .home-swiper-bullet {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        margin: 0 .08rem;
        border-radius: .1rem;
        background: rgba(255, 255, 255, 0.5);
  }
  .home-swiper-bullet-active {
        background: #fff;
  }
</style>
