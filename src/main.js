import Vue from 'vue'
import App from './App.vue' //加载公共组件

// Vue.component(`pager`, pager);
new Vue({
    el: '#app',
    render: h => h(App),
});
