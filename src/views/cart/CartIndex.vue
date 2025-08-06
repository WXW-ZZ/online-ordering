<template>
    <div class="cart">
        <Header title="购物车" :edit="true"/>
        <cart-detail v-if="isShow" :changeShow="changeShow"/>
        <Empty v-else/>
        <Footer/>
    </div>
</template>
<script>
import Footer from '../../components/Footer.vue'
import { useStore } from 'vuex';
import Empty from "../../components/Empty.vue";
import Header from '../../components/Header.vue';
import CartDetail from './components/CartDetail.vue';
import {ref,onMounted} from 'vue'

export default{
    components:{
        Footer,
        Empty,
        Header,
        CartDetail,
    },
    setup(){
        const isShow=ref(true)
        const store=useStore()
        const init=()=>{
            if(store.state.cartList.length===0){
                isShow.value=false
            }
        }
        const changeShow=()=>{
            isShow.value=false
        }
        onMounted(()=>{
            init()
        })
        
        return{
            isShow,
            changeShow
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

.cart{
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
