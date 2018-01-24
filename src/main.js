import Vue from 'vue'
import App from './app/App'
import router from './router'
import store from './vuex'
import FastClick from 'fastclick';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import { Loadmore } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import { Picker } from 'mint-ui';
import { Popup } from 'mint-ui';


Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Loadmore.name, Loadmore);


window.bus = new Vue()
FastClick.attach(document.body);
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
