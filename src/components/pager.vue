<style type="text/css">
    body {
        overflow: auto;
        line-height: 1;
        font-size: 12px;
        font-family: "\5B8B\4F53", "Arial";
    }
    .vue-pagination {
        display: inline-block;
        vertical-align: middle;
        margin: 10px 0;
    }
    .vue-pagination li{
        display: inline-block;
        color:#666666;
    }
    .vue-pagination li a{
        padding:.5rem 1rem;
        display:inline-block;
        border:1px solid #ddd;
        background:#fff;
        color:#666666;
    }
    .vue-pagination li a:hover{
        background:#eee;
    }
    .vue-pagination li.active a{
        background:#0E90D2;
        background-color: #20a8f7 !important;
        color:#fff;
    }
    .vue-pagination li input{
        width: 50px;
        margin: 0 5px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        border: 1px solid #e2e2e2;
        border-radius: 2px;
        background-color: #fff;
        box-sizing: border-box!important;
    }
</style>
<template>
    <div id="app">
    <div class="vue-pagination" style="display: inline-block;vertical-align: middle;margin: 10px 0;" v-if="page>1">
        <ul>
            <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="pageTo(1)"> 首页 </a></li>
            <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="pageTo(current - 1)"> 上一页 </a></li>
            <li v-for="p in grouplist" :class="{'active': current == p.val}"><a href="javascript:;" @click="pageTo(p.val)"> {{p.text }} </a></li>
            <li :class="{'disabled': current == page}"><a href="javascript:;" @click="pageTo(current + 1)"> 下一页</a></li>
            <li :class="{'disabled': current == page}"><a href="javascript:;" @click="pageTo(page)"> 尾页 </a></li>
            <li style="margin:0 5px;">第<input type="number" min="1" v-model.number="inputNum" onkeyup="this.value=this.value.replace(/\D/, '');" >页</li>
            <li><a href="javascript:;" @click="btnPage()" style="padding: .5rem;"> 确定 </a></li>
            <li style="margin:0 5px;">/共 {{page}}页</li>
        </ul>
    </div>
    </div>
</template>
<script>

    export default {
        name: 'pager',
        data() {
            return {
                inputNum: 1,    //文本框输入页码
            }
        },
        props: {
            total: {            // 数据总条数
                type: Number,
                default: 0,
            },
            display: {            // 每页显示条数
                type: Number,
                default: 10,
            },
            current: {            // 当前页码
                type: Number,
                default: 1,
            },
            pagegroup: {        // 分页条数 -- 奇数
                type: Number,
                default: 5,
                coerce:function(v){
                    v = v > 0 ? v : 5;
                    return v % 2 === 1 ? v : v + 1;
                },
            }
        },
        computed:{
            page() { // 总页数
                return Math.ceil(this.total / this.display);
            },
            grouplist(){ // 获取分页页码
                this.inputNum = this.current;
                var len = this.page , temp = [], list = [], count = Math.floor(this.pagegroup / 2) ,center = this.current;
                if( len <= this.pagegroup ){
                    while(len--){ temp.push({text:this.page-len,val:this.page-len});};
                    return temp;
                }
                while(len--){ temp.push(this.page - len);};
                var idx = temp.indexOf(center);
                (idx < count) && ( center = center + count - idx);
                (this.current > this.page - count) && ( center = this.page - count);
                temp = temp.splice(center - count -1, this.pagegroup);
                do {
                    var t = temp.shift();
                    list.push({
                        text: t,
                        val: t
                    });
                }while(temp.length);
                if( this.page > this.pagegroup ){
                    (this.current > count + 1) && list.unshift({ text:'...',val: list[0].val - 1 });
                    (this.current < this.page - count) && list.push({ text:'...',val: list[list.length - 1].val + 1 });
                }
                return list;
            }
        },
        methods:{
            pageTo(idx) {
                if( this.current != idx && idx > 0 && idx < this.page + 1) {
                    this.$emit('pageTo',idx);
                }
            },
            btnPage() {
                if ( this.inputNum!=null && this.inputNum!=undefined ) {
                    if (this.inputNum<1) {
                        this.inputNum = 1;
                    }
                    if (this.inputNum>this.page) {
                        this.inputNum = this.page;
                    }
                    if(this.current != this.inputNum && this.inputNum > 0 && this.inputNum < this.page + 1) {
                        this.$emit('pageTo',this.inputNum);
                    }
                }
            }
        }
    }
</script>