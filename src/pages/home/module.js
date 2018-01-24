import axios from 'axios';

export default {
    state: {
        currentTab: 'recommend',
        active: 0,
        tabs: [],
        swiper: [],
        loanSuccSwper: []
    },
    mutations: {
        changeHomeData(state, payload) {
        	state.currentTab = payload.data.picMsg.currentTab;
        	state.actions = payload.data.picMsg.active;
        	state.tabs = payload.data.picMsg.picURL;
            state.swiper = payload.data.ad;
            state.loanSuccSwper = payload.data.tips
        },
        increment(state, payload) {
	        	state.currentTab = payload.tabname;
	            state.active = payload.index;
                state.tabs.forEach(function(item){  
                item.flag = false;
                state.tabs[payload.index].flag = true;
            })
       }
    },
    actions: {  
    	SgetHomeData(context) {
            let toten = window.localStorage.lastId
    		axios.get("/api/bxd_inf_v2/inf/bxd/home?_qtype=1001&token="+toten+"") //让用户登录
                .then((response) => {
                      if(response.status == 200) {
                            if(response.data.userInfo.token == 0) {
                                localStorage.removeItem('lastId')
                                localStorage.removeItem('phoneNum')
                                localStorage.removeItem('userName')
                                localStorage.removeItem('idCard')
                                localStorage.removeItem('careerType')
                                localStorage.removeItem('isCreditcard')
                            }
                      		context.commit("changeHomeData", response)
                      }
        		})  
    	}                    
        
    }
}
