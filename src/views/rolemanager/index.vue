<template>
  <div class="dashboard-editor-container" ref="dashboardEeditor">
    <div class=" clearfix">
      <div class="filter-area">
        <el-row>
          <el-col :span="7">
            <el-button type="primary" @click="addRole" size="small">新增<i class="el-icon--right el-icon-plus"></i>
            </el-button>
          </el-col>
          <el-col :span="5" style=" float: right">
            <el-input size="small" class="" v-on:keyup.enter.native="searchRole" v-model="keyword"
                      placeholder="请输入角色名称"><i
              @click="searchRole" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-table
            :data="roleTableData"
            :header-cell-style="tableRowStyle"
            @row-click=""
            v-loading="listLoading"
            style="width: 100%">
            <el-table-column
              prop="rolename"
              label="角色名称"
              align="left"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="roledesc"
              label="角色描述"
              align="left"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="relativeapp"
              label="关联角色"
              align="center"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="relativeuser"
              label="关联用户"
              align="center"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="handle"
              label="操作"
              align="center"
              width="100">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="editRole(scope.row)" style="color: #409EFF"></i>
                <i><img class="table_icon" title="应用" :src="appIconSrc" alt="" @click="goToRoleApp(scope.row)"/></i>
                <i><img class="table_icon" title="用户" :src="userIconSrc" alt="" @click="goToRoleUser(scope.row)"/></i>
                <i class="el-icon-delete" @click="delRole(scope.row)" style="color: #F56C6C"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination-container" v-if="roleTableData.length != 0">
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
        <el-col :span="5"><span class="desc required_label">角色名称</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" v-model="newRole.rolename" placeholder="请输入内容" required></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="desc">角色描述</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" v-model="newRole.roledesc" placeholder="请输入内容" type="textarea"></el-input>
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
  import appIcon from '@/assets/app.svg/'
  import userIcon from '@/assets/users.svg/'
  import {getRoleList, delRole, addRole, editRole} from '@/api/article'

  export default {
    name: 'roleindex',
    components: {},
    data() {
      return {
        uploadUrl: '',
        fileList: [],
        isnewRoleLnameDisable: false,
        appIconSrc: appIcon,
        userIconSrc: userIcon,
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
        dialogTitle: '新增角色',
        roleTableData: [],
        multipleSelection: [],
        total: null,
        dialogVisible: false,
        newRole: {
          rolename: '',
          roledesc: ''
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
      _searchRole(url, searchData) {
        getRoleList(url, Object.assign({}, searchData, this.listQuery)).then(response => {
          this.roleTableData = response.data.items
          console.log(response.data)
          this.total = response.data.total || response.data.total.items || response.data.length
          this.listLoading = false
          // 删除最后一页 无数据时候边界处理
          if (this.roleTableData.length == 0 && this.listQuery.page >= Math.ceil(this.total / this.listQuery.size)) {
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
        const url = '/role/list'
        const searchData = {
          owner: this.userid,
          search: ''
        }
        this._searchRole(url, searchData)
      },
      searchRole() {
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
        const url = '/role/list'
        this._searchRole(url, searchData)
        /* /roles?search={search}&owner={user}
        search, 应⽤名关键字
        owner, ⽤户id*/
        console.log(this.keyword)
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        if (this.keyword) {
          this.searchRole()
        } else {
          this.getList()
        }
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        if (this.keyword) {
          this.searchRole()
        } else {
          this.getList()
        }
      },
      tableRowStyle: function () {
        return 'color: black;background-color: #FAFAFA;'
      },
      rowClick(data) {

      },
      editRole(data) {
        this.dialogTitle = '编辑角色'
        this.isnewRoleLnameDisable = true
        this.dialogVisible = true
        setTimeout(() => {
          this.newRole.rolename = data.rolename
          this.newRole.id = data.id
          this.newRole.roledesc = data.roledesc
        })

      },
      delRole(data) {
        const url = '/role/delete'
        const delData = []
        delRole(url, data).then(response => {
          if (response.data.code.toString().charAt(0) == 2) {
            this.$message({
              type: 'success',
              message: '删除成功~'
            })
            this.getList()
          }
        }).catch(err_ => {
        })
      },
      addRole() {
        this.isnewRoleLnameDisable = false
        this.dialogTitle = '新增角色'
        this.dialogVisible = true
      },
      goToRoleApp(data) {
        this.$store.dispatch('saveRoleData', data).then(() => {
          this.$router.push({ path: '/rolemanager/roleindex/roleappmanager'})
        })
      },
      goToRoleUser(data) {
        this.$store.dispatch('saveRoleData', data).then(() => {
          this.$router.push({ path: '/rolemanager/roleindex/roleusermanager'})
        })
      },
      clearNewContent() {
        this.newRole.rolename = ''
        this.newRole.roledesc = ''
      },
      confirmAdd() {
        if (this.newRole.rolename == '') {
          this.$message({
            type: 'warning',
            message: '请输入角色名称!'
          })
          return
        }

        var str = '确认新增么？'
        if (this.dialogTitle == '编辑角色') {
          str = '确认修改么？'
        }
        this.$confirm(str)
          .then(_ => {
            this.building = true
            console.log(this.newRole)
            if (this.dialogTitle == '编辑角色') {
              editRole(this.newRole).then(response => {
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
              addRole(this.newRole).then(response => {
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
