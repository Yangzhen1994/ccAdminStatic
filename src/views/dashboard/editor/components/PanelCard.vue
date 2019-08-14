<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('app')">
        <div class="card-panel-icon-wrapper icon-app">
          <svg-icon icon-class="excel" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">应用</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="appVal" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('iso')">
        <div class="card-panel-icon-wrapper icon-iso">
          <svg-icon icon-class="example" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">镜像</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="isoVal" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <!--<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('service')">
        <div class="card-panel-icon-wrapper icon-service">
          <svg-icon icon-class="component" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">服务编排</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="serviceVal" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('warning')">
        <div class="card-panel-icon-wrapper icon-warning">
          <svg-icon icon-class="bug" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">告警</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="warningVal" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>-->
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props: {
    appVal: {
      type: Number,
      default: 0
    },
    isoVal: {
      type: Number,
      default: 0
    },
    serviceVal: {
      type: Number,
      default: 0
    },
    warningVal: {
      type: Number,
      default: 0
    }
  },
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-app {
         background: #40c9c6;
      }
      .icon-iso {
        background: #36a3f7;
      }
      .icon-service {
        background: #f4516c;
      }
      .icon-warning {
        background: #e6a23c
      }
    }
    .icon-app {
      color: #40c9c6;
    }
    .icon-iso {
      color: #36a3f7;
    }
    .icon-service {
      color: #f4516c;
    }
    .icon-warning {
      color: #e6a23c;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
