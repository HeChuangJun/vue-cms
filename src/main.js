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
import { Header, Swipe, SwipeItem,Button} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

import router from './router.js'
//导入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)

import moment from 'moment'
//全局配置根路由，必须在resource后面
Vue.http.options.root = 'http://127.0.0.1:8090';

Vue.filter('dateFormat',function(datastr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(datastr).format(pattern);
})

var vm = new Vue({
    el:'#app',
    render: c=>c(app),
    router
})