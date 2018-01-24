<template>

  <div class="loan-recommendation">
       <ul class="loan-recommendation-tab">
              <li class="recommendation-tab" v-for="(item,index) in tabs" @click="toggleTab(item.type, index)" :class="{active: active == index}">
                  <span :class="{option: option == index }">{{item.view}}</span>
              </li>
        </ul>
        <prince :is="currentTab" ></prince>
  </div>
</template>

<script>
    import PopularRecommendation from  './recommendation/PopularRecommendation'
    import NewArrivals from  './recommendation/NewArrivals'
    import CreditCardLoan from  './recommendation/CreditCardLoan'
    export default {
        data() {
            return {
                currentTab: 'PopularRecommendation',
                active: 0,
                option: 0,
                 tabs: [{
                    type: "PopularRecommendation",
                    view: "热门推荐"
                }, {
                    type: "NewArrivals",
                    view: "新品推荐"
                }, {
                    type: "CreditCardLoan",
                    view: "信用卡贷"
                }]
            }
        },
        components: { 
                "PopularRecommendation": PopularRecommendation,
                "NewArrivals": NewArrivals,
                "CreditCardLoan": CreditCardLoan
        },
        mounted() {
                let a = this.$route.query.plan
                bus.$on("aaa", function(res){
                    this.active = res.active;
                    this.currentTab = res.type;
                    this.option = res.option;
                }.bind(this))
        },
        methods: {
                toggleTab: function(tab, i) {
                    this.currentTab = tab;
                    this.active = i;
                    this.option = i;
                    i+=1002;
                    bus.$emit("click", i)
               }
        }
    }
</script>


<style scoped>
    .loan-recommendation {
        overflow: scroll;
    }
  	.loan-recommendation-tab {
        display: flex;
        margin: 0 0.15rem;
        background: #fff;
        border-radius: 0 0 0.2rem 0.2rem;
    }
    .recommendation-tab {
        flex: 1;
        text-align: center;
        line-height: 0.8rem;
    }
    .active {
        color: #fff;
        border: 1px solid #f29700;
        background: #f29700;
        box-shadow:0 0 2px #000 inset;
        border-radius: 0.1rem
    }
    .option {
        /* padding-bottom: 0.2rem;
        border-bottom: 2px solid #f29700; */
    }
</style>
