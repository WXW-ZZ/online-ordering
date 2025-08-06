<template>
    <div class="create-order">
        <Header title="生成订单"/>
        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
        <div class="content">
            <div v-for="(item, index) in store.state.orderList" :key="index">
            <van-card
                :num="item.num"
                :price="item.price"
                :title="item.title"
                :thumb="item.pic"
            />
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{ totalPrice }}</span>
            </div>
            <van-button type="primary" class="pay-btn" block color="#ffc400" @click="handleCreateOrder">生成订单</van-button>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive,toRefs } from 'vue'
import Header from  '../../components/Header.vue'
import {useStore} from 'vuex' 
import { showDialog } from 'vant';
import { useRouter,useRoute} from 'vue-router';



export default{
    components:{
        Header,
    },
    setup() {
        const data=reactive({
            tel:'12325436546',
            name:'zhuzhu',
            totalPrice:0
        })
        const store=useStore()
        const router=useRouter()
        const route=useRoute()
        const onEdit=()=>{
            router.push('/address')
        }
        const initPrice=()=>{
            let price=0
            if(store.state.orderList.length){
                store.state.orderList.forEach((item)=>{
                    price+=item.num*item.price
                })
            }
            data.totalPrice=price
        }

        //初始化用户的地址
        const initUser=()=>{
            store.state.userAddress.forEach((item)=>{
                if(item.isDefault){
                    data.name=item.name
                    data.tel=item.tel
                }          
            })
        }
        const handleCreateOrder = () => {
            showDialog({ 
                title:'提示',
                message: '生成订单成功', 
            }).then(()=>{
                //与购物车联系起来
                let newList=store.state.cartList.filter(item=>{
                    return !route.query.list.includes(item.id+'')
                })
                store.commit('delete',newList)
                store.commit('orderListEnd')
                router.push('/order')
            })
        };
        onMounted(()=>{
            initPrice(),
            initUser()
        })
        return {
            ...toRefs(data),
            onEdit,
            store,
            handleCreateOrder,
        }
    }
}
</script>

<style>
.create-order {
  display: flex;
  flex-flow: column;
  min-height: 100vh; /* 占满整个视口高度 */
  height: 100%;
  overflow: hidden; /* 防止整体滚动 */
}

.content {
  flex: 1; /* 填充父容器剩余空间 */
  overflow-y: auto; /* 内容过多时可滚动 */
  padding: 10px; /* 可选：添加内边距 */
}

.pay-wrap {
  padding: 10px 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e9e9e9;
  margin-top: auto; /* 固定在底部 */
}

/* 其他样式保持不变 */
.pay-wrap .price {
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  margin: 10px 0;
  font-size: 14px;
}

.pay-wrap .price span:nth-child(2) {
  color: red;
  font-size: 18px;
}

.pay-wrap .pay-btn {
  width: 90%;
  margin: 0 auto;
}
</style>