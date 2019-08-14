<template>
  <el-col :offset="1" :span="span" :style="{background:color,padding:'5px'}">
    <div class="val_div">{{result}}</div>
    <div class="title_div">{{title}}</div>
  </el-col>
</template>

<script>
export default {
  name: 'SmallBlock',
  props: {
    result: {
      type: String,
      default: 0
    },
    span: {
      type: Number,
      default: 4
    },
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#fff'
    },
    currentVal: {
      type: Number,
      default: 4
    },
    totalVal: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style scoped>
  .val_div{
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .val_div,.title_div{
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
</style>
