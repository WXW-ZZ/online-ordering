<template>
    <div class="home">
        <div class="content">
            <div class="header">
                <div class="text">外卖</div>
                <div class="location">
                    <van-icon name="location-o" />
                    <span>jason课程分享</span>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="main">
                <div class="main-bg">
                    <div class="search">
                        <input type="text"/>
                        <div class="search-text">
                            搜索
                        </div>
                    </div>
                    <div class="sort">
                        <div class="big-sort">
                            <div v-for="(item,index) in big_sort" :key="index" >
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#${item.icon}`"></use>
                                </svg>
                                {{ item.name }}
                            </div>    
                        </div>
                        <div class="small-sort">
                            <div v-for="(item,index) in small_sort" :key="index" >
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#${item.icon}`"></use>
                                </svg>
                                {{ item.name }}
                            </div>    
                        </div>
                    </div>
                    <van-tabs v-model:active="active" class="van-tabs">
                        <van-tab v-for="(item,index) in centent_nav_list" :title="item.tab" :key="index">
                            <nav-list :navList="item.data"></nav-list>
                        </van-tab>
                    </van-tabs>
                </div>
                
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
import Footer from '../../components/Footer.vue'
import {reactive,toRefs,ref,onMounted} from 'vue'
import NavList from './components/NavList.vue'
import {getApiHomeData} from '../../api/api'

export default{
    components:{
        Footer,
        NavList
    },
    setup(){
        const active=ref(0)
        let data= reactive({
                big_sort: [ ],
                small_sort: [],
                centent_nav_list: [],
            }  
        ) 
        const getHomeData=()=>{
            getApiHomeData().then(res=>{
                data.small_sort=res.small_sort
                data.big_sort=res.big_sort
                data.centent_nav_list=res.centent_nav_list
            })        
        }
        onMounted(()=>{
            getHomeData()
        })
        return {
            ...toRefs(data),
            active 
        }
        
    }
}
</script>



<style lang="less" scoped>
// 确保父级元素（html、body）高度占满屏幕
// 这里通过 :root 选择器设置全局基础样式
:root {
    height: 100%;
    min-height: 100vh; // 兼容不同浏览器的视口高度
}

.home{
    display: flex;
    flex-flow: column;
    min-height: 100vh; // 使用视口高度作为容器最小高度
    width: 100%; // 确保宽度占满
    font-size: 12px;

    .content{
        flex: 1; // 内容区域自动填充剩余空间
        overflow-y: auto; // 内容超出时可滚动
        .header{
            background-image:linear-gradient(#ffc400,#fff) ;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 20px 40px 20px;
            .text{
                font-size: 20px;
                font-weight: 600;
            }
            .location{
                span{
                    margin: 0 5px;
                }
                font-size: 14px;
            }
        }
        .main{
            margin-top:-30px ;
            .main-bg{
                background-image: linear-gradient(#fff,#f5f5f5);
                padding: 10px 20px 0px 20px;
                border-radius: 30px 30px 0 0;
                .search{
                position: relative;
                input{
                    width: 100%;
                    border: 1px solid #ffc400;
                    border-radius:20px ;
                    height: 30px;
                }
                .search-text{
                    position: absolute;
                    right: -6px;
                    top:1px;
                    background-color: #ffc400;
                    border-radius: 16px;
                    width: 50px;
                    line-height: 32px;
                    font-size: 14px;
                    text-align: center;
                }
            }
                .sort{
                    padding: 20px 0;
                    .big-sort{
                        display: flex;
                        div{
                            flex:1;
                            display: flex;
                            justify-content: center;
                            flex-flow: column;
                            align-items: center;
                            .icon{
                                width: 50px;
                                height: 50px;
                                margin-bottom: 5px;
                            }
                        }
                    }
                    .small-sort{
                        display: flex;
                        flex-wrap: wrap;
                        margin-top:20px;
                        div{
                            display: flex;
                            justify-content: center;
                            flex-flow:column ;
                            align-items: center;
                            width: 20%;
                        }
                        .icon{
                            width: 30px;
                            height: 30px;
                            margin: 10px;
                        }
                    }

                }
            
            }
            .van-tabs{
                padding: 0 20px 10px;
            }
        }
    }
}

/deep/ .van-tabs__wrap{
    border-radius:10px ;
}

// 可选：给Footer添加底部固定样式（防止内容过少时Footer上浮）
::v-deep .footer { // 假设Footer组件的根类名为footer，使用::v-deep穿透scoped
    width: 100%;
    margin-top: auto; // 强制Footer靠下
}
</style>
