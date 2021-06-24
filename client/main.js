import Vue from 'vue';
import App from './App.vue';
import routes from "./routes";
import Vuex from "vuex";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    // mode: 'history',
});
const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })
new Vue({
    render: h => h(App),
    router,
    store,
  }).$mount('#app')