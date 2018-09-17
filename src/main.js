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

import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)


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
    router
})