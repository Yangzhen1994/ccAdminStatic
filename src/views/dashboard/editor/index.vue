<template>
  <div class="dashboard-editor-container" ref="dashboardEeditor">
    <div class=" clearfix">
      <panel-card @handleSetLineChartData="handleSetLineChartData" :app-val="numData.appVal" :iso-val="numData.isoVal" :service-val="numData.serviceVal" :warning-val="numData.warningVal"></panel-card>
    </div>
    <div class="card_area">
      <el-card class="box-card" v-if="prodData.app.result || prodData.service.result">
        <div slot="header" class="clearfix">
          <span>生产环境</span>
        </div>
        <el-row>
          <small-block v-if="prodData.app.result" :span=spanNum color="#40c9c6" title="应用"  :current-val="prodData.app.currentVal" :total-val="prodData.app.totalVal" :result="prodData.app.result"></small-block>
          <small-block v-if="prodData.service.result" :span=spanNum color="#f4516c" title="服务编排"  :current-val="prodData.service.currentVal" :total-val="prodData.service.totalVal" :result="prodData.service.result"></small-block>
        </el-row>

      </el-card>
      <el-card class="box-card box-card-test" v-if="testData.app.result || testData.service.result">
        <div slot="header" class="clearfix">
          <span>测试环境</span>
        </div>
        <el-row>
          <small-block v-if="testData.app.result" :span=spanNum color="#40c9c6" title="应用"  :current-val="testData.app.currentVal" :total-val="testData.app.totalVal" :result="testData.app.result"></small-block>
          <small-block v-if="testData.service.result" :span=spanNum color="#f4516c" title="服务编排"  :current-val="testData.service.currentVal" :total-val="testData.service.totalVal" :result="testData.service.result"></small-block>
        </el-row>
      </el-card>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'
import { MessageBox } from 'element-ui'
import PanelCard from './components/PanelCard'
import SmallBlock from './components/SmallBlock'

const lineChartData = {
  app: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  iso: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  service: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  warning: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard-editor',
  components: { PanelCard, SmallBlock },
  data() {
    return {
      showSandbox: null,
      showProduction: null,
      spanNum: 2,
      listLoading: false,
      keyword: '',
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableData: [],
      total: null,
      dialogVisible: false,
      newApp: {
        name: '',
        arrangeCodeRes: false
      },
      lineChartData: lineChartData.newVisitis,
      numData: {
        appVal: 0,
        isoVal: 0,
        serviceVal: 0,
        warningVal: 0
      },
      prodData: {
        app: {
          currentVal: 0,
          totalVal: 10,
          result: 0
        },
        service: {
          currentVal: 0,
          totalVal: 20,
          result: 0
        }
      },
      testData: {
        app: {
          currentVal: 0,
          totalVal: 10,
          result: 0
        },
        service: {
          currentVal: 0,
          totalVal: 10,
          result: 0
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    // this.getList()
    //this.getUserGeneralView()
  },
  methods: {
    handleSetLineChartData(type) {
      if (type == 'app') {
        this.$router.push({ path: '/appmanager/applist' })
      } else if (type == 'iso') {
        this.$router.push({ path: '/isomanager/index' })
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.items
        console.log(response.data)
        this.total = response.data.total
        this.listLoading = false
      })
    },
    searchApp() {
      console.log(this.keyword)
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    tableRowStyle: function() {
      return 'color: black;background-color: #FAFAFA;'
    },
    rowClick(data) {
      this.$store.dispatch('saveAppData', data).then(() => {
        this.$router.push({ path: '/appmanager/appgy', query: data.id })
      })
    },
    buildApp() {
      this.dialogVisible = true
    },
    clearNewContent() {
      this.newApp.name = ''
      this.newApp.arrangeCodeRes = false
    },
    confirmBuild() {
      if (this.newApp.name == '') {
        this.$message({
          type: 'warning',
          message: '请输入名称!'
        })
        return
      }
      this.$confirm('确认创建么？')
        .then(_ => {
          // todo 创建
          console.log(this.newApp)
          this.dialogVisible = false
        })
        .catch(_ => {})
    },
    _toggleMainContainerMarginL(str) {
      if (!str) { str = 0 }
      // 右侧容器左边距归零
      // console.log(this.$refs.dashboardEeditor.parentNode.parentNode.parentNode)
      this.$refs.dashboardEeditor.parentNode.parentNode.parentNode.style.marginLeft = str
    }
  },
  mounted() {
    // this.$store.dispatch('toggleSideBarShow')
    // this._toggleMainContainerMarginL(0)
    // this.$store.dispatch('toggleSideBarShow')
    // document.getElementById('appmanager').style.display = 'none'
  },
  beforeDestroy() {
    // this.$store.dispatch('toggleSideBarShow')
    // 右侧容器左边距归零
    // console.log(this.$refs.dashboardEeditor.parentNode.parentNode.parentNode)

    // this._toggleMainContainerMarginL('272px')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add_dialog .el-row{
    margin-bottom: 20px;
  }
  .desc{
    position: relative;
    top: 8px;
  }
  .editor-title{
    font-size: 24px;
  }
  .filter-area{
    margin: 20px 0;
  }
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }
  .el-icon-search{
    cursor: pointer;
  }
  .card_area {
    margin-top: 24px;
    .box-card-test{
      margin-top: 24px;
    }
  }
  .dashboard-editor-container {
    min-height: 100vh;
    padding:24px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }

</style>
