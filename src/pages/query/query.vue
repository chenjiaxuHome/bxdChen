<template>
	<div class="query">
		<div class="details-head">
            <img class="details-head-img" :src="img" @click="handleReturn">
            <span class="details-head-teatle">贷款进度查询</span>
        </div>
		
		<ul class="query-list" >
            <li v-show="show" class="show">没有贷款数据</li>
			<li class="query-item" @click="handleChangeQuery(item.loanId, item.status, item.progressId)" v-for="item in list">
				<img class="query-item-img" :src="item.iconUrl">
				<ul class="query-query">
					<li class="query-query-name">{{item.loanName}}</li>
					<li class="query-query-ipone">咨询电话 {{item.mgt_phone}}</li>
					<li class="query-query-time">{{item.created}}</li>
				</ul>
			</li>
		</ul>

	</div>
</template>

<script>
    import axios from 'axios';
	export default {
		data() {
			return {
                list: [],
                img: "",
                show: false
			}
		},
        mounted() {
            this.getQuery();
        },
		methods: {
            getQuery() {
                let token = window.localStorage.lastId
                axios.get("/api/bxd_inf_v2/inf/sys/getApplyRecord?token="+token+"")
                    .then((response) => {
                    if(response.status == 200 ) {
                        console.log(response)
                        this.list = response.data.items; 
                        this.img = response.data.returnUrl
                         if(this.list == "") {
                            this.show = true
                        }else {
                            this.show = false
                        }
                    }
                })
            },
            handleChangeQuery(loanId, status, progressId) {
                this.$router.push({
                        path: '/InquireDetails',
                        query: {
                            loanId: loanId,
                            status: status,
                            progressId: progressId
                        }

                })
            },
            handleReturn() {
                this.$router.go(-1)
            }
		}
	}
</script>


<style scoped>

	.details-head {
        position: absolute;
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
    	padding-top: 1.2rem;
    	border-bottom: 1px solid #eee;
    }
    .query-item {
    	display: flex;
    	height: 1.6rem;
    	background: #fff;
    }
    .query-item-img {
    	height: 1rem;
    	padding: 0.3rem;
    }
    .query-query {
    	display: flex;
    	flex-direction: column;
    	justify-content: space-around;
    }
    .query-query-name {
    	font-size: 0.35rem;
    	color: #000;
    }
    .query-query-ipone {
    	font-size: 0.3rem;
    	color: #222;
    }
    .query-query-time {
    	font-size: 0.25rem;
    	color: #999;
    }

    .show {
        background: #fff;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
    }
</style>
