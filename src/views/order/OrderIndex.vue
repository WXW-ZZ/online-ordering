<template>
    <div class="order">
        <Header title="订单"/>
        <div class="content">
            <van-tabs color="#Ffc400">
                <van-tab :title="item" v-for="(item, index) in navData" :key="index">
                    <!-- 父级容器判断条件 -->
                    <div v-if="item === '全部' && store.state.orderListEnd.length">
                        <!-- 子元素只保留 v-for -->
                        <div v-for="(i, idx) in store.state.orderListEnd" :key="idx">
                        <van-card
                            :num="i.num"
                            :price="i.price"
                            :title="i.title"
                            :thumb="i.pic"
                        />
                        </div>
                    </div>
                    <div v-else>
                        <Empty />
                    </div>
                    </van-tab>
            </van-tabs>
        </div>
        <Footer/>
    </div>
</template>
<script>
import { reactive ,toRefs} from 'vue'
import Footer from '../../components/Footer.vue'
import Header from '../../components/Header.vue'
import Empty from '../../components/Empty.vue'
import { useStore } from 'vuex'



export default{
    components:{
        Footer,
        Header,
        Empty
    },
    setup(){
        const store=useStore()
        const data=reactive({
            navData:['全部','交易完成','待付款','待发货','已发货']
        })
        return {
            ...toRefs(data),
            store
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

.order{
    display: flex;
    flex-flow: column;
    min-height: 100vh; // 使用视口高度作为容器最小高度
    width: 100%; // 确保宽度占满

    .content{
        flex: 1; // 内容区域自动填充剩余空间
        overflow-y: auto; // 内容超出时可滚动
    }
}

// 可选：给Footer添加底部固定样式（防止内容过少时Footer上浮）
::v-deep .footer { // 假设Footer组件的根类名为footer，使用::v-deep穿透scoped
    width: 100%;
    margin-top: auto; // 强制Footer靠下
}
</style>
