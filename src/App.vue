<template>
  <div class="app-container">

    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="Vue项目">
		<span slot="left" @click="goBack" v-show="flag">
			<mt-button icon="back">返回</mt-button>
		</span>
	</mt-header>


    <!-- 中间的 路由 router-view 区域 -->
	  <transition>
			<router-view></router-view>
	  </transition>


    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{$store.getters.getAllcount}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

  </div>
</template>

<script>
	export default {
	    data(){
	        return{
                flag:true
			}
		},
		created(){
	        this.flag=this.$route.path==='/home'?false:true;
		},
		methods:{
            goBack(){
                this.$router.go(-1);
			}
		},
		watch:{
	        '$route.path':function(newval){
	            if(newval=='/home'){
	                this.flag=false;
				}else{
	                this.flag=true;
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
.app-container{
	padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;
}
.v-enter{
	//元素的动画开始前的初始状态和动画结束后的时候的最终状态，是一个时间点
	opacity: 0;
	transform: translateX(100%)
}
.v-leave-to{
	//元素的动画开始前的初始状态和动画结束后的时候的最终状态，是一个时间点
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,
.v-leave-active{
	//入出场的动画的时间段
	transition: all 0.8s ease;//渐变
}
.mui-bar-tab .mui-tab-item-llb.mui-active {
	color: #007aff;
}
.mui-bar-tab .mui-tab-item-llb {
	display: table-cell;
	overflow: hidden;
	width: 1%;
	height: 50px;
	text-align: center;
	vertical-align: middle;
	white-space: nowrap;
	text-overflow: ellipsis;
	color:#929292;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon {
	top: 3px;
	width: 24px;
	height: 24px;
	padding-top: 0;
	padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
	font-size: 11px;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
}
.mint-header{
	z-index: 99;
}
</style>
