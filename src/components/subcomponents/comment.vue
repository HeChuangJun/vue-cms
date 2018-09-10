<template>
    <div class="cmt-container">
        <h3>发表评论</h3>

        <hr>
        <textarea placeholder="请输入要bb的内容(最多吐槽120)" maxlength="120"></textarea>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments":key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">{{item.content===''?'此用户很懒，什么都没说':item.content}}</div>
            </div>
        </div>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <mt-button type="danger" size="large"plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    export default {
        data(){
            return {
                comments:[],
                pageIndex:1//默认显示第一页
            }
        },
        created(){
            this.getComments()
        },
        methods:{
            getComments(){
                this.$http.get("api/getcomments/"+this.id+"/"+this.pageIndex).then(result=>{
                    if(result.body.status === 0) {
                        this.comments=this.comments.concat(result.body.message);
                    }else{
                        Toast("评论数据加载失败");
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getComments();
            }
        },
        props:['id']
    }
</script>

<style lang="scss" scoped>
.cmt-container{

    margin: 5px 0;
    h3{
        font-size: 18px;

    }
    textarea{
        font-size: 14px;
        height:85px;
        margin: 0;
    }
    .cmt-list{
        margin-top: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>