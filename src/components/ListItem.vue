<template>
    <div class="content-item">
        <div class="left">
          <van-checkbox :name="item.id" v-if="showCheckBox" checked-color="#ffc400"/>
            <img :src="item.pic" alt="食品图片">
            <div class="text">
                <div class="title">{{item.title}}</div>
                <van-icon name="add-o" v-if="!localNum" @click="handleAdd(item.id)" />
                <van-stepper 
                    v-else 
                    v-model="localNum" 
                    :name="item.id" 
                    @change="handleChange" 
                />
            </div>
        </div>
        <div class="price">￥{{item.price}}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        showCheckBox:{
          type:Boolean,
        }      
    },
    setup(props, { emit }) {
        const { ref, watch } = require('vue');
        
        // 创建本地状态存储数量
        const localNum = ref(props.item.num || 0);
        
        // 监听 prop 的变化，更新本地状态
        watch(() => props.item.num, (newVal) => {
            localNum.value = newVal;
        });
        
        // 处理添加商品
        const handleAdd = () => {
            emit('add', props.item.id);
        };
        
        // 处理数量变化
        const handleChange = (value) => {
            localNum.value = value;
            emit('change', value, { name: props.item.id });
        };
        
        return {
            localNum,
            handleAdd,
            handleChange
        };
    }
  };
  </script>
  
  <style scoped lang="less">
  // 样式保持不变
  </style>
  <style scoped lang="less">
  
  .content-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .price {
        font-size: 16px;
        font-weight: 600;
      }
      .left {
        display: flex;
        align-items: center;
        flex: 1;
        img {
          margin-left: 10px;
          width: 60px;
          height: 60px;
          margin-right: 10px;
          border-radius: 10px;
        }
        .text {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          height: 100%;
          position: relative;
          flex: 1;
          .title {
            font-size: 16px;
          }
          .van-icon {
            color: red;
            font-size: 20px;
            position: absolute;
            right: 4px;
            bottom: 4px;
          }
        }
      }
    }
  
  </style>