//入口文件
import Vue from 'vue'
//安装路由
import VueRouter from 'vue-router'

Vue.use(VueRouter)



//导入app组件
import app from './App.vue'
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'




// 按需导入 Mint-UI 中的组件
/*import { Header, Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload);*/
import  MuntUI from 'mint-ui'
Vue.use(MuntUI)
import 'mint-ui/lib/style.css'
//缩略图
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)
//使用vue管理工具
import Vuex from 'vuex'
Vue.use(Vuex)
//从本地缓存中取出之前操作的数据
var car = JSON.parse(localStorage.getItem('car')|| '[]');

const store = new Vuex.Store({
    state: {//相当于组件的data
        car:car//将购物车中的商品数据每一项的格式{id,count,price,selected}
    },
    mutations: {//相当于组件的methods

        addToCar (state,goodsinfo) {

            var flag = false;
            state.car.some(item=>{
                if(item.id== goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count);
                    flag=true;
                    return true
                }
            })

            if(!flag){
                state.car.push(goodsinfo);
            }
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsInfo(state,goodsinfo){
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                    return true
                }

            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromcar(state,id){
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1)
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        getAllcount:function(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count;
            })
            return c;
        },
        //商品的键为商品的id，值为数量
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id]=item.count;
            })
            return o;
        },
        getGoodsSelected(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o= {count:0,amount:0};
            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price*item.count;
                }
            })
            return o;
        }
    }
})


import router from './router.js'
//导入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)

import moment from 'moment'
//全局配置根路由，必须在resource后面
Vue.http.options.root = 'http://127.0.0.1:8090';
//全局设置post表单数据格式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

Vue.filter('dateFormat',function(datastr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(datastr).format(pattern);
})

var vm = new Vue({
    el:'#app',
    render: c=>c(app),
    router,
    store
})