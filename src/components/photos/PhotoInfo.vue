<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time|dateFormat}}</span>
            <span>点击: {{photoinfo.click}}次</span>

        </p>
        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        <hr/>
        <!--图片内容区域-->
        <div class="content">
            {{photoinfo.content}}
        </div>
        <!--评论子组件-->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'




    export default {
        data(){
            return {
                id:this.$route.params.id,
                photoinfo:{},
                slide1:[]
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods:{
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.photoinfo=result.body.message;
                    }
                }
                )
            },
            getThumbs(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                        if(result.body.status===0){

                                result.body.message.forEach(item=>{
                                    console.log(item);
                                    item.msrc=item.src;
                                    item.w=600;
                                    item.h=400;
                                    item.title=this.photoinfo.content;
                                    item.alt='picture';
                                });
                            this.slide1=result.body.message;
                        }
                    }
                )
            }
        },
        components:{
            "cmt-box":comment
        }

    }
</script>

<style lang="scss" >
.photoinfo-container{
    padding:3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
        figure{
            width:80px;
            height: 80px;
            overflow: hidden;
            margin: 10px;
            padding: 0px;
            float: left;
            img {
                width:80px;
                height: 80px;
                box-shadow: 0 0 9px #999;
            }
        }

    }
    hr{
        clear: both;
    }
}

</style>