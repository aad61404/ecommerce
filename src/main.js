import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.component('Loading',Loading);
 
import App from './App';
import router from './router';
import './bus';
// import $ from 'jquery'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // $,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  // ...
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});