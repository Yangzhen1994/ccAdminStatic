<template>
  <div class="dashboard-editor-container" ref="dashboardEeditor">
    <div class=" clearfix">
      <div class="filter-area">
        <el-row>
          <el-col :span="7">
            <el-button type="primary" @click="addApp" size="small">新增<i class="el-icon--right el-icon-plus"></i>
            </el-button>
            <el-button type="primary" @click="delApp" size="small">删除<i class="el-icon--right el-icon-delete"></i>
            </el-button>
          </el-col>
          <el-col :span="5" style=" float: right">
            <el-input size="small" class="" v-on:keyup.enter.native="searchApp" v-model="keyword"
                      placeholder="请输入应用名称"><i
              @click="searchApp" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-table
            :data="appTableData"
            :header-cell-style="tableRowStyle"
            @row-click=""
            @selection-change="handleSelectionChange"
            v-loading="listLoading"
            style="width: 100%">
            <el-table-column
              fixed
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column

              prop="apptype"
              label="应用分类"
              align="left"
              width=""
              class-name="pd10">
            </el-table-column>
            <el-table-column

              prop="appname"
              label="应用名称"
              align="left"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="appdesc"
              label="应用描述"
              align="left"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="state"
              label="是否可点击"
              align="center"
              width="100">
              <template slot-scope="scope">
                <!-- PENDDING|STARTED|FINISHED|FAILED|ABORT-->
                <el-tag
                  :type="scope.row.state.toString().toLowerCase() === 'true' ? 'success' : 'info'"
                  disable-transitions>{{scope.row.state.toString().toLowerCase() === 'true'? '是' : '否'}}
                </el-tag>
              </template>

            </el-table-column>
            <el-table-column
              prop="handle"
              label="操作"
              align="center"
              width="100">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="editApp(scope.row)" style="color: #409EFF"></i>
                <!-- <i class="el-icon-edit" @click="editApp()" v-if="!scope.row.state"></i>-->
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination-container" v-if="appTableData.length != 0">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size"
                         layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>

      </div>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%"
      class="add_dialog"
      @open="clearNewContent"
    >
      <el-row>
        <el-col :span="5"><span class="desc required_label">应用分类</span></el-col>
        <el-col :span="12" :offset="1">
          <el-select v-model="newApp.apptype" placeholder="请选择" size="small" style="width: 250px">
            <el-option
              v-for="item in newApptypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="desc required_label">应用名称</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" v-model="newApp.appname" placeholder="请输入内容" required></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="desc">应用描述</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" v-model="newApp.appdesc" placeholder="请输入内容" type="textarea"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="desc required_label">是否可点击</span></el-col>
        <el-col :span="12" :offset="1">
          <el-select v-model="newApp.state" placeholder="请选择" size="small" style="width: 250px">
            <el-option
              v-for="item in newAppStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="desc">应用首页url</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" ref="" v-model="newApp.indexurl" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="desc">用户同步接口</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" ref="" v-model="newApp.interface" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="desc required_label">显示序号</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" v-model="newApp.index" placeholder="请输入内容" required></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="desc required_label">显示图标</span></el-col>
        <el-col :span="12" :offset="1">
          <el-upload
            class="upload"
            :action="uploadUrl"
            accept=".jpg,.jpeg,.png"
            :on-change="fileChange"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-remove="removeImg"
            :auto-upload="true"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg、jpeg、png文件，且不超过20M</div>
          </el-upload>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAdd" :disabled="building">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import addIcon from '@/assets/add.png/'
  import stopIcon from '@/assets/stop.png/'
  import playIcon from '@/assets/play.png/'
  import PanThumb from '@/components/PanThumb'
  import GithubCorner from '@/components/GithubCorner'
  import {MessageBox} from 'element-ui'
  import {getAppList, delApp, addApp, editApp} from '@/api/article'
  import {validatePhone} from '@/utils/validate'

  export default {
    name: 'appindex',
    components: {},
    data() {
      return {
        uploadUrl: '',
        fileList: [],
        isnewAppLnameDisable: false,
        stopIconSrc: stopIcon,
        playIconSrc: playIcon,
        addIcon: addIcon + '?' + +new Date(),
        building: false,
        listLoading: false,
        keyword: '',
        roleValue: '全部',
        apartValue: '全部',
        listQuery: {
          page: 1,
          size: 10
        },
        dialogTitle: '新增应用',
        appTableData: [],
        multipleSelection: [],
        newAppStateOptions: [
          {
            value: true,
            label: '是'
          },
          {
            value: false,
            label: '否'
          }
        ],
        newApptypeOptions: [
          {
            value: '专题应用',
            label: '专题应用'
          },
          {
            value: '基础平台',
            label: '基础平台'
          },
          {
            value: '数据中枢-数据服务',
            label: '数据中枢-数据服务'
          },
          {
            value: '数据中枢-数据治理',
            label: '数据中枢-数据治理'
          },
          {
            value: '数据中枢-资源目录',
            label: '数据中枢-资源目录'
          },
          {
            value: '数据中枢-数据湖',
            label: '数据中枢-数据湖'
          },
          {
            value: '数据中枢-数据通',
            label: '数据中枢-数据通'
          },
          {
            value: '数据中枢-基础支撑与服务',
            label: '数据中枢-基础支撑与服务'
          }
        ],
        total: null,
        dialogVisible: false,
        newApp: {
          apptype: '',
          appname: '',
          appdesc: '',
          state: '',
          indexurl: '',
          interface: '',
          icon: '',
          image: ''
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
        getAppList(url, Object.assign({}, searchData, this.listQuery)).then(response => {
          this.appTableData = response.data.items
          console.log(response.data)
          this.total = response.data.total || response.data.total.items || response.data.length
          this.listLoading = false
          // 删除最后一页 无数据时候边界处理
          if (this.appTableData.length == 0 && this.listQuery.page >= Math.ceil(this.total / this.listQuery.size)) {
            this.listQuery.page--
            this.getList()
          }
          /* if (cb && typeof cb === 'function') {
             cb()
           }*/
        })
      },
      getList(cb) {
        this.listLoading = true
        // const url = '/apps'
        const url = '/app/list'
        const searchData = {
          owner: this.userid,
          search: ''
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

        /* const url = '/apps'*/
        const url = '/app/list'
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
      tableRowStyle: function () {
        return 'color: black;background-color: #FAFAFA;'
      },
      rowClick(data) {

      },
      editApp(data) {
        if (!data) {
          this.$message({
            type: 'warning',
            message: '不可点击'
          })
          return false
        }
        console.log(data)
        this.dialogTitle = '编辑应用'
        this.isnewAppLnameDisable = true
        this.dialogVisible = true
        setTimeout(() => {
          this.newApp.apptype = data.apptype
          this.newApp.appname = data.appname
          this.newApp.appdesc = data.appdesc
          this.newApp.state = data.state
          this.newApp.indexurl = data.indexurl
          this.newApp.interface = data.interface
          this.newApp.index = data.index
          this.newApp.id = data.id
          if (data.iconname) {
            this.fileList.push({
              name: data.iconname,
              url: data.icon
            })
          }
        })

      },
      delApp() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的应用~'
          })
        } else {
          // todo 删除
          const url = '/app/delete'
          const delData = []
          this.multipleSelection.forEach((item, index) => {
            delData.push(item.id)
          })
          delApp(url, delData).then(response => {
            if (response.data.code.toString().charAt(0) == 2) {
              this.$message({
                type: 'success',
                message: '删除成功~'
              })
              this.getList()
            }
          }).catch(err_ => {
          })
        }
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
      },
      addApp() {
        this.isnewAppLnameDisable = false
        this.dialogTitle = '新增用户'
        this.dialogVisible = true
      },
      clearNewContent() {
        this.newApp.apptype = ''
        this.newApp.appname = ''
        this.newApp.appdesc = ''
        this.newApp.state = ''
        this.newApp.indexurl = ''
        this.newApp.interface = ''
        this.newApp.icon = ''
        this.fileList = []
      },
      confirmAdd() {
        if (this.newApp.apptype == '') {
          this.$message({
            type: 'warning',
            message: '请选择应用类型!'
          })
          return
        }
        if (this.newApp.appname == '') {
          this.$message({
            type: 'warning',
            message: '请输入应用名称!'
          })
          return
        }
        if (this.newApp.state === '') {
          this.$message({
            type: 'warning',
            message: '请选择应用是否可点击!'
          })
          return
        }
        if (this.newApp.index == '') {
          this.$message({
            type: 'warning',
            message: '请输入显示序号!'
          })
          return
        }
        //暂时把图标验证去除 由于上传接口未知
        /*if (this.fileList.length == 0) {
          this.$message({
            type: 'warning',
            message: '请上传显示图标!'
          })
          return
        }*/
        /* if (this.newApp.description == '') {
          this.$message({
            type: 'warning',
            message: '请输入描述!'
          })
          return
        }*/
        var str = '确认新增么？'
        if (this.dialogTitle == '编辑应用') {
          str = '确认修改么？'
        }
        this.$confirm(str)
          .then(_ => {
            this.building = true
            console.log(this.newApp)
            if (this.dialogTitle == '编辑应用') {

              editApp(this.newApp).then(response => {
                if (response.data.code.toString().charAt(0) == 2) {
                  this.getList()
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                }
                this.building = false
              })
            } else {
              addApp(this.newApp).then(response => {
                if (response.data.code.toString().charAt(0) == 2) {
                  this.getList()
                  this.$message({
                    type: 'success',
                    message: '创建成功!'
                  })
                }
                this.building = false
              })
            }

            this.dialogVisible = false
          })
          .catch(_ => {
          })
      },
      fileChange(file, fileList) {
        if (file && file.size) {
          if (file.size > 20 * 1024 * 1024) {
            this.$message({
              type: 'warning',
              message: '图片大小不得超过20M'
            })
            this.fileList = []
          }
        }
      },
      uploadSuccess(response, file, fileList) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        // todo 返回的文件名 写到 icon字段 然后保存新增
        this.newApp.iconname = response.name
        this.newApp.icon = response.url
      },
      uploadError() {
        this.$message({
          type: 'error',
          message: '上传失败'
        })
      },
      removeImg(file, fileList) {
        console.log(file, fileList)
        this.newApp.iconname = ''
        this.newApp.icon = ''
      }
    },
    mounted() {
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
  .add_dialog .el-row {
    margin-bottom: 20px;
  }

  .desc {
    position: relative;
    top: 4px;
  }

  .editor-title {
    font-size: 24px;
  }

  .filter-area {
    margin-bottom: 20px;
  }

  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .el-icon-search {
    cursor: pointer;
  }

  .dashboard-editor-container {
    min-height: 100vh;
    padding: 24px;
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

  .table_icon {
    width: 14px;
    height: 14px;
    margin-left: 5px;
    position: relative;
    top: 1px;
  }

  .el-checkbox-group > .el-checkbox:nth-of-type(3n+1) {
    margin-left: 0;
  }
</style>
