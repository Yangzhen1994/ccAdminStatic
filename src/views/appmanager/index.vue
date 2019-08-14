<template>
  <div class="dashboard-editor-container" ref="dashboardEeditor">
    <div class=" clearfix">
      <div class="filter-area">
        <el-row>
          <el-col :span="6"> <el-button type="primary" @click="">新增用户<i class="el-icon--right el-icon-plus"></i></el-button></el-col>
          <el-col :span="9" style="float: right"> <el-input class="w_348" v-on:keyup.enter.native="searchApp" v-model="keyword" placeholder="登录名、姓名和手机号码"><i @click="searchApp" slot="suffix" class="el-input__icon el-icon-search"></i></el-input></el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-table
            :data="userTableData"
            :header-cell-style="tableRowStyle"
            @row-click=""
            v-loading="listLoading"
            style="width: 100%">
            <el-table-column
              fixed
              prop="loginname"
              label="登录名"
              align="left"
              width=""
              class-name="pd10">
            </el-table-column>
            <el-table-column
              fixed
              prop="realname"
              label="姓名"
              align="left"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="belong"
              label="所属部门"
              align="center"
              width="">
              <template slot-scope="scope">
                <div v-if="!scope.row.type" style="color: #C0C4CC">暂无</div>
                <div v-if="scope.row.type">{{scope.row.belong}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="phonenumber"
              label="手机号"
              align="left"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              align="left"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              align="center"
              width="">
              <template slot-scope="scope">
                <!-- PENDDING|STARTED|FINISHED|FAILED|ABORT-->
                <el-tag
                  :type="scope.row.state.toLowerCase() === 'started' ? 'success' : 'danger'"
                  disable-transitions>{{scope.row.state.toLowerCase() === 'started'? '启用' : '禁用'}}</el-tag>
              </template>

            </el-table-column>
            <el-table-column
              prop="report"
              label="操作"
              align="center"
              width="">
              <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click=""><i class="el-icon-edit"></i></el-button>
                <!-- <a href="javascript:;" @click="fetchBuildReport(scope.row.buildno)">查看</a>-->
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination-container" v-if="userTableData.length != 0">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>

      </div>
    </div>

    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="40%"
      class="add_dialog"
      @open="clearNewContent"
    >
      <el-row>
        <el-col :span="4"><span class="desc">应用名称</span></el-col>
        <el-col :span="12" :offset="1"><el-input v-model="newApp.appname" placeholder="请输入内容"></el-input></el-col>
      </el-row>
      <!-- <el-row>
         <el-col :span="4"><span class="desc">应用描述</span></el-col>
         <el-col :span="12" :offset="1"><el-input v-model="newApp.description" placeholder="请输入内容" type="textarea"></el-input></el-col>
       </el-row>-->
      <el-row>
        <el-checkbox v-model="newApp.assign_code_repo">开通代码仓库</el-checkbox>
        <!--<el-col :span="4"><span class="desc">开通代码仓库</span></el-col>
        <el-col :span="12" :offset="1"><el-input v-model="newApp.name" placeholder="请输入内容"></el-input></el-col>-->
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmBuild" :disabled="building">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import addIcon from '@/assets/add.png/'
  import PanThumb from '@/components/PanThumb'
  import GithubCorner from '@/components/GithubCorner'
  import { MessageBox } from 'element-ui'
  import {getUserList} from '@/api/article'
  export default {
    name: 'appindex',
    components: {},
    data() {
      return {
        addIcon: addIcon + '?' + +new Date(),
        building: false,
        listLoading: false,
        keyword: '',
        listQuery: {
          page: 1,
          size: 10,
        },
        userTableData: [],
        total: null,
        dialogVisible: false,
        newApp: {
          appname: '',
          /* description: '',*/
          assign_code_repo: false
        }

      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles',
        'userid'
      ])
    },
    created() {
      this.getList()
    },
    methods: {
      _searchApp(url, searchData) {
        searchAppByKeyword(url, Object.assign({}, searchData, this.listQuery)).then(response => {
          this.userTableData = response.data.items
          console.log(response.data)
          this.total = response.data.total.items || response.data.length
          this.listLoading = false
          /* if (cb && typeof cb === 'function') {
             cb()
           }*/
        })
      },
      getList(cb) {
        this.listLoading = true
        const url = '/apps'
        const searchData = {
          owner: this.userid,
          search:''
        }
        this._searchApp(url, searchData)
      },
      searchApp() {
        console.log(this.listQuery)
        if (!this.keyword) {
          /* this.$message({
            showClose: true,
            message: '请输入关键字',
            type: 'error'
          })*/
          this.getList()
          return
        }
        const searchData = {
          search: this.keyword,
          owner: this.userid
        }

        const url = '/apps'
        this._searchApp(url, searchData)
        /* /apps?search={search}&owner={user}
        search, 应⽤名关键字
        owner, ⽤户id*/
        console.log(this.keyword)
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        if (this.keyword) {
          this.searchApp()
        } else {
          this.getList()
        }
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        if (this.keyword) {
          this.searchApp()
        } else {
          this.getList()
        }
      },
      tableRowStyle: function() {
        return 'color: black;background-color: #FAFAFA;'
      },
      rowClick(data) {

      },
      buildApp() {
        this.$router.push({ path: '/appmanager/appcreate' })
        // this.dialogVisible = true
      },
      clearNewContent() {
        this.newApp.appname = ''
        this.newApp.description = ''
        this.newApp.assign_code_repo = false
      },
      confirmBuild() {
        if (this.newApp.appname == '') {
          this.$message({
            type: 'warning',
            message: '请输入名称!'
          })
          return
        }
        /* if (this.newApp.description == '') {
          this.$message({
            type: 'warning',
            message: '请输入描述!'
          })
          return
        }*/
        this.$confirm('确认创建么？')
          .then(_ => {
            this.building = true
            console.log(this.newApp)
            const sendData = {}
            sendData.owner = this.userid
            sendData.app = this.newApp.appname
            sendData.assign_code_repo = this.newApp.assign_code_repo
            createApp(sendData).then(response => {
              if (response.data) {
                this.keyword = ''
                this.total++
                this.listQuery.page = Math.ceil(this.total / this.listQuery.size)
                this.getList()
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                })
                this.$store.dispatch('saveAppData', response.data.data).then(() => {
                  this.$router.push({ path: '/appmanager/appdetail/appgy', query: response.data.id })
                })
              }
              this.building = false
            })
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
    },
    watch: {
      keyword(newVal, oldVal) {
        this.listQuery.size = 10
        this.listQuery.page = 1
      }
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
