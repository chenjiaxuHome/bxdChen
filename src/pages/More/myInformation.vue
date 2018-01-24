<template>
	<div class="myInformation">
		<div class="details-head">
            <img class="details-head-img" @click="details" :src="myImg.return">
            <span class="details-head-teatle">关于我们</span>
        </div>
        <div ref="res" class="myInformations">
            <div class="kong"></div>
            <div class="logoHeart">
                <img class="logo" :src="myImg.logo">
                <span class="Edition">1.1.0</span>
            </div>
            <div class="contact">
                <ul class="List-contact">
                    <li class="Item-contact">
                        <span class="Item-left">官方微信:</span>
                        <span class="Item-right">{{iformation.wx_num}}</span>
                    </li>
                    <li class="Item-contact">
                        <span class="Item-left">客服电话:</span>
                        <span class="Item-right">{{iformation.kefu_phone}}</span>
                    </li>
                    <li class="Item-contact">
                        <span class="Item-left">合作邮箱:</span>
                        <span class="Item-right">{{iformation.email}}</span>
                    </li>
                    <li class="Item-contact">
                        <span class="Item-left">合作电话:</span>
                        <span class="Item-right">{{iformation.contacts_phone}}</span>
                    </li>
                </ul>
            </div>
            <ul class="service-list">
                <li class="service-item">服务条款</li>
                <li class="service-item">{{iformation.company_name}}</li>
                <li class="service-item">{{iformation.company_url}}</li>
            </ul>
        </div>
	</div>
</template>

<script>
    import axios from "axios"
	export default {
		data() {
            return {
                myImg: {},
                iformation: {}
                
            }
        },
        mounted() {
            this.getInformation();
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.res.style.height = h + 'px';
        },
        methods: {
            getInformation() {
                axios.get("/api/bxd_inf_v2/inf/sys/about_info")
                    .then((response) => {
                    if(response.status == 200 ) {
                        this.myImg = response.data.imgUrl;
                        this.iformation = response.data.item;
                    }
                })
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
    

    .more-item {
        height: 0.9rem;
        background: #fff;
        line-height: 0.9rem;
        padding-left: 0.2rem;
        margin-top: 0.2rem;
    }
    .kong {
        height: 1.5rem;
    }
    
    .logoHeart {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .logo {
        height: 2rem;
        width: 2rem;
    }
    .Edition {
        padding: 0.3rem 0;
    }
    .contact {
        display: flex;
        justify-content: center;
    }
    .List-contact {
       width: 4rem;
    }
    .Item-contact {
        margin: 0.2rem 0;
    }
    .service-list {
        position: absolute;
        bottom: 0.5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .service-item {
        padding: 0.1rem 0;
    }
    
</style>
