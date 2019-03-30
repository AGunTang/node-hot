import Vue from 'vue'
import App from './App.vue';

//导入路由
import router from './router';

// 饿了吗组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入全局通用样式
import './assets/css/base.scss';


Vue.config.productionTip = true;

new Vue({ 
  render: h => h(App),
  //挂载路由
  router
}).$mount('#app')
