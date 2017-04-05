<template>

    <pager :total="total" :current="current" :display="display" v-on:pageTo="pageTo"></pager>
</template>

<script>
    import pager from './components/pager.vue' //加载公共组件
export default {
  name: 'app',
    //数据对象
    data() {
        return {
            total: 81,     // 记录总条数
            display: 10,   // 每页显示条数
            current: 1     // 当前第n页 ， 也可以 watch current 的变化
        }
    },
    components: {pager},
    methods: {
        //页面跳转（分页控件调用方法）
        pageTo(page){     // page 为新的 current
            this.current = page;
        },
    },
}
</script>