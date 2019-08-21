<template>
  <div>
    <div class="dashboard-editor-container" ref="dashboardEeditor">
      <div class=" clearfix">
        <div class="filter-area">
          <el-row>
            <div style="color: #333;font-size: 14px;margin-bottom: 20px">角色 <span style="color: #4AB7BD">{{roledata.rolename}}</span>
              的应用
            </div>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-button type="primary" @click="addRoleApp" size="small">新增<i
                class="el-icon--right el-icon-plus"></i>
              </el-button>
              <el-button type="primary" @click="delRoleApp" size="small">删除<i
                class="el-icon--right el-icon-delete"></i>
              </el-button>
            </el-col>
            <el-col :span="5" style=" float: right">
              <el-input size="small" class="" v-on:keyup.enter.native="searchRoleApp" v-model="keyword"
                        placeholder="应用名称"><i
                @click="searchRoleApp" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-table
              :data="RoleAppTableData"
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
                width="">
                <template slot-scope="scope">
                  <div v-if="!scope.row.appdesc" style="color: #C0C4CC">暂无</div>
                  <div v-if="scope.row.appdesc">{{scope.row.appdesc}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="report"
                label="操作"
                align="center"
                width="">
                <template slot-scope="scope">
                  <i class="el-icon-share" @click="pushUserToApp(scope.row)" style="color: #409EFF" title="推送"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <div class="pagination-container" v-if="RoleAppTableData.length != 0">
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
          <div class="add_type_title" type="专题应用" ref="ztyy">专题应用</div>
          <div>
            <el-checkbox-group v-model="ztyy" size="small">
              <el-checkbox-button v-for="city in ztyys" :label="city" :key="city">{{city}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>

        </el-row>
        <el-row>
          <div class="add_type_title" type="基础应用" ref="jcyy">基础应用</div>
          <div>
            <el-checkbox-group v-model="jcyy" size="small">
              <el-checkbox-button v-for="city in jcyys" :label="city" :key="city">{{city}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-row>
        <el-row>
          <div class="add_type_title" type="数据中枢-数据服务" ref="sjzssjfw">数据中枢-数据服务</div>
          <div>
            <el-checkbox-group v-model="sjfw" size="small">
              <el-checkbox-button v-for="city in sjfws" :label="city" :key="city">{{city}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-row>
        <el-row>
          <div class="add_type_title" type="数据中枢-数据治理" ref="sjzssjzl">数据中枢-数据治理</div>
          <div>
            <el-checkbox-group v-model="sjzl" size="small">
              <el-checkbox-button v-for="city in sjzls" :label="city" :key="city">{{city}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-row>
        <el-row>
          <div class="add_type_title" type="数据中枢-资源目录" ref="sjzszyml">数据中枢-资源目录</div>
          <div>
            <el-checkbox-group v-model="zyml" size="small">
              <el-checkbox-button v-for="city in zymls" :label="city" :key="city">{{city}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-row>
        <el-row>
          <div class="add_type_title" type="数据中枢-数据通" ref="sjzssjt">数据中枢-数据通</div>
          <div>
            <el-checkbox-group v-model="sjt" size="small">
              <el-checkbox-button v-for="city in sjts" :label="city" :key="city">{{city}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-row>
        <el-row>
          <div class="add_type_title" type="数据中枢-基础支撑与服务" ref="sjzsjczcyfw">数据中枢-基础支撑与服务</div>
          <div>
            <el-checkbox-group v-model="jczcyfw" size="small">
              <el-checkbox-button v-for="city in jczcyfws" :label="city" :key="city">
                {{city}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-row>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAdd" :disabled="building">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getRoleAppList, delRoleApp, addRoleApp } from '@/api/article'
  import { validatePhone } from '@/utils/validate'

  export default {
    name: 'RoleAppmanager',
    components: {},
    data() {
      return {
        uploadUrl: '',
        fileList: [],
        building: false,
        listLoading: false,
        keyword: '',
        roleValue: '全部',
        apartValue: '全部',
        listQuery: {
          page: 1,
          size: 10
        },
        dialogTitle: '新增角色',
        RoleAppTableData: [],
        multipleSelection: [],
        total: null,
        dialogVisible: false,
        ztyy: [],
        jcyy: [],
        sjfw: [],
        sjzl: [],
        zyml: [],
        sjt: [],
        jczcyfw: [],
        ztyys: ['智慧城管', '智慧建管', '智慧环保', '智慧社区'],
        jcyys: ['城市运行管理平台', '数据共创平台', '物联网管理平台'],
        sjfws: ['数据共享服务平台', '数据开放平台', '数据活化服务平台'],
        sjzls: ['数据质量管理'],
        zymls: ['信息资源梳理系统', '资源目录管理系统', '资源目录可视化系统'],
        sjts: ['数据通', '数据交换平台', 'ESB'],
        jczcyfws: ['PaaS', '内容管理'],
        newRoleApp: {
          belongRole: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles',
        'userid',
        'roledata'
      ])
    },
    created() {
      this.newRoleApp.belongRole = this.roledata.rolename

      this.getList()
    },
    methods: {
      _searchRoleApp(url, searchData) {
        getRoleAppList(url, Object.assign({}, searchData, this.listQuery)).then(response => {
          this.RoleAppTableData = response.data.items
          console.log(response.data)
          this.total = response.data.total || response.data.total.items || response.data.length
          this.listLoading = false
          // 删除最后一页 无数据时候边界处理
          if (this.RoleAppTableData.length == 0 && this.listQuery.page >= Math.ceil(this.total / this.listQuery.size)) {
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
        // const url = '/roles'
        const url = '/role/' + this.roledata.id + '/app/list'
        const searchData = {
          owner: this.userid,
          search: ''
        }
        this._searchRoleApp(url, searchData)
      },
      searchRoleApp() {
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

        /* const url = '/roles'*/
        const url = '/role/' + this.roledata.id + '/app/list'
        this._searchRoleApp(url, searchData)
        /* /roles?search={search}&owner={user}
        search, 应⽤名关键字
        owner, ⽤户id*/
        console.log(this.keyword)
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        if (this.keyword) {
          this.searchRoleApp()
        } else {
          this.getList()
        }
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        if (this.keyword) {
          this.searchRoleApp()
        } else {
          this.getList()
        }
      },
      tableRowStyle: function() {
        return 'color: black;background-color: #FAFAFA;'
      },
      rowClick(data) {

      },
      pushUserToApp(data) {
        var appid = data.id
        var userid = this.roledata.id
        //console.log(data, appid, userid)
        this.$confirm('确认批量推送"'+this.roledata.rolename+'"角色的所有用户到该应用系统么')
          .then(_ => {
              this.$message({
                type: 'success',
                message: '推送成功!'
              })
            })
          .catch(_ => {
          })
      },
      delRoleApp(data) {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的应用~'
          })
        } else {
          const url = '/role/' + this.roledata.id + '/app/delete'
          const delData = []
          this.multipleSelection.forEach((item, index) => {
            delData.push(item.id)
          })
          delRoleApp(url, delData).then(response => {
            if (response.data.code.toString().charAt(0) == 2) {
              this.$message({
                type: 'success',
                message: '删除成功~'
              })
              this.keyword = ''
              this.getList()
            }
          }).catch(err_ => {
          })
        }
      },
      addRoleApp() {
        //this.isnewRoleLnameDisable = false
        this.dialogTitle = '新增应用'
        this.dialogVisible = true
      },
      clearNewContent() {
        this.ztyy = [],
        this.jcyy = [],
        this.sjfw = [],
        this.sjzl = [],
        this.zyml = [],
        this.sjt = [],
        this.jczcyfw = []
      },
      confirmAdd() {
        if (this.ztyy.length == 0 && this.jcyy.length == 0 && this.sjfw.length == 0 && this.sjzl.length == 0 && this.zyml.length == 0 && this.sjt.length == 0 && this.jczcyfw.length == 0) {
          this.$message({
            type: 'warning',
            message: '请至少选择一个应用~'
          })
          return
        }
        this.$confirm('确认新增应用么~')
          .then(_ => {
            this.building = true
            const url = '/role/' + this.roledata.id + '/app/add'
            var apps = this._normalizeAppList()
            this.newRoleApp.apps = apps
            addRoleApp(url, this.newRoleApp).then(response => {
              if (response.data.code.toString().charAt(0) == 2) {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                })
              }
              this.building = false
            })
            this.dialogVisible = false
          })
          .catch(_ => {
          })
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
      },
      _normalizeAppList() {
        var nameStr = ''
        var apps = []
        //var allNameArr = this.ztyy.concat(this.jcyy, this.sjfw, this.sjzl, this.zyml, this.sjt, this.jczcyfw)
       // nameStr = allNameArr.join()
        this.ztyy.forEach((item,index) => {
          apps.push({
            type:'专题应用',
            name: item
          })
        })
        this.jcyy.forEach((item,index) => {
          apps.push({
            type:'基础应用',
            name: item
          })
        })
        this.sjfw.forEach((item,index) => {
          apps.push({
            type:'数据中枢-数据服务',
            name: item
          })
        })
        this.sjzl.forEach((item,index) => {
          apps.push({
            type:'数据中枢-数据治理',
            name: item
          })
        })
        this.zyml.forEach((item,index) => {
          apps.push({
            type:'数据中枢-资源目录',
            name: item
          })
        })
        this.sjt.forEach((item,index) => {
          apps.push({
            type:'数据中枢-数据通',
            name: item
          })
        })
        this.jczcyfw.forEach((item,index) => {
          apps.push({
            type:'数据中枢-基础支撑与服务',
            name: item
          })
        })
        return apps
      }
    },
    mounted() {
    },
    beforeDestroy() {

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

  .add_dialog .add_type_title {
    font-weight: bold;
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
