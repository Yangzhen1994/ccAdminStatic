<template>
  <div>
    <div class="dashboard-editor-container" ref="dashboardEeditor">
      <div class=" clearfix">
        <div class="filter-area">
          <el-row>
            <div style="color: #333;font-size: 14px;margin-bottom: 20px">角色 <span style="color: #4AB7BD">{{roledata.rolename}}</span> 的用户</div>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-button type="primary" @click="addRoleUserUser" size="small">新增<i
                class="el-icon--right el-icon-plus"></i>
              </el-button>
              <el-button type="primary" @click="delRoleUser" size="small">删除<i
                class="el-icon--right el-icon-delete"></i>
              </el-button>
            </el-col>
            <el-col :span="5" style=" float: right">
              <el-input size="small" class="" v-on:keyup.enter.native="searchRoleUser" v-model="keyword"
                        placeholder="登录名 姓名"><i
                @click="searchRoleUser" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-table
              :data="roleUserTableData"
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

                prop="loginname"
                label="登录名"
                align="left"
                width=""
                class-name="pd10">
              </el-table-column>
              <el-table-column

                prop="realname"
                label="姓名"
                align="left"
                width=""
              >
              </el-table-column>
              <el-table-column
                prop="belongApart"
                label="所属部门"
                align="center"
                width="">
                <template slot-scope="scope">
                  <div v-if="!scope.row.belongApart" style="color: #C0C4CC">暂无</div>
                  <div v-if="scope.row.belongApart">{{scope.row.belongApart}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                align="left"
                width=""
              >
              </el-table-column>
            </el-table>
          </el-row>
          <div class="pagination-container" v-if="roleUserTableData.length != 0">
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
          <el-col :span="3"><span class="desc required_label">登录名</span></el-col>
          <el-col :span="12" :offset="1">
            <el-input size="small"  v-model="newRoleUser.loginname" placeholder="请输入内容"
                      required></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3"><span class="desc required_label">姓名</span></el-col>
          <el-col :span="12" :offset="1">
            <el-input size="small" v-model="newRoleUser.realname" placeholder="请输入内容" required></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3"><span class="desc required_label">所属部门</span></el-col>
          <el-col :span="12" :offset="1">
            <el-select v-model="newRoleUser.belongApart" placeholder="请选择" size="small" style="width: 250px">
              <el-option
                v-for="item in newRoleUserApartOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3"><span class="desc required_label">手机号码</span></el-col>
          <el-col :span="12" :offset="1">
            <el-input size="small" ref="newUserPhone" v-model="newRoleUser.phonenumber" placeholder="请输入内容" required
                      @blur="vaitePhone"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3"><span class="desc">备注信息</span></el-col>
          <el-col :span="12" :offset="1">
            <el-input size="small" v-model="newRoleUser.description" placeholder="请输入内容" type="textarea"></el-input>
          </el-col>
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
  import {mapGetters} from 'vuex'
  import {getRoleUserList, delRoleUser, addRoleUser} from '@/api/article'
  import {validatePhone} from '@/utils/validate'
  export default {
    name: 'roleusermanager',
    components: {},
    data() {
      return {
        uploadUrl: '',
        fileList: [],
        isnewRoleLnameDisable: false,
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
        roleUserTableData: [],
        multipleSelection: [],
        newRoleUserApartOptions: [
          {
            value: '公安局',
            label: '公安局'
          },
          {
            value: '统计局',
            label: '统计局'
          },
          {
            value: '卫计委',
            label: '卫计委'
          }
        ],
        total: null,
        dialogVisible: false,
        newRoleUser: {
          belongRole:'',
          loginname: '',
          realname: '',
          belongApart: '',
          phonenumber: '',
          description: ''
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
      this.newRoleUser.belongRole = this.roledata.rolename

      this.getList()
    },
    methods: {
      _searchRoleUser(url, searchData) {
        getRoleUserList(url, Object.assign({}, searchData, this.listQuery)).then(response => {
          this.roleUserTableData = response.data.items
          console.log(response.data)
          this.total = response.data.total || response.data.total.items || response.data.length
          this.listLoading = false
          // 删除最后一页 无数据时候边界处理
          if (this.roleUserTableData.length == 0 && this.listQuery.page >= Math.ceil(this.total / this.listQuery.size)) {
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
        const url = '/role/'+this.roledata.id+'/user/list'
        const searchData = {
          owner: this.userid,
          search: ''
        }
        this._searchRoleUser(url, searchData)
      },
      searchRoleUser() {
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
        const url = '/role/'+this.roledata.id+'/user/list'
        this._searchRoleUser(url, searchData)
        /* /roles?search={search}&owner={user}
        search, 应⽤名关键字
        owner, ⽤户id*/
        console.log(this.keyword)
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        if (this.keyword) {
          this.searchRoleUser()
        } else {
          this.getList()
        }
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        if (this.keyword) {
          this.searchRoleUser()
        } else {
          this.getList()
        }
      },
      tableRowStyle: function () {
        return 'color: black;background-color: #FAFAFA;'
      },
      rowClick(data) {

      },
      delRoleUser(data) {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的用户~'
          })
        } else {
          const url = '/role/'+this.roledata.id+'/user/delete'
          const delData = []
          this.multipleSelection.forEach((item, index) => {
            delData.push(item.id)
          })
          delRoleUser(url, delData).then(response => {
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
      addRoleUserUser() {
        this.isnewRoleLnameDisable = false
        this.dialogTitle = '新增用户'
        this.dialogVisible = true
      },
      vaitePhone() {
        if (this.newRoleUser.phonenumber && !validatePhone(this.newRoleUser.phonenumber)) {
          this.$message({
            type: 'warning',
            message: '手机号不合法!'
          })
          this.newRoleUser.phonenumber = ''
          this.$refs.newUserPhone.focus()
        }
      },
      clearNewContent() {
        this.newRoleUser.loginname = '',
        this.newRoleUser.realname = '',
        this.newRoleUser.belongApart = '',
        this.newRoleUser.phonenumber = '',
        this.newRoleUser.description = ''
      },
      confirmAdd() {
        if (this.newRoleUser.loginname == '') {
          this.$message({
            type: 'warning',
            message: '请输入登录名!'
          })
          return
        }
        if (this.newRoleUser.realname == '') {
          this.$message({
            type: 'warning',
            message: '请输入姓名!'
          })
          return
        }
        if (this.newRoleUser.belongApart == '') {
          this.$message({
            type: 'warning',
            message: '请选择部门!'
          })
          return
        }
        if (this.newRoleUser.phonenumber == '') {
          this.$message({
            type: 'warning',
            message: '请输入手机号!'
          })
          return
        }
        var str = '确认新增么？'
        if (this.dialogTitle == '编辑用户') {
          str = '确认修改么？'
        }
        this.$confirm(str)
          .then(_ => {
            this.building = true
            this.newRoleUser.belongRole = this.roledata.rolename
            console.log(this.newRoleUser)
            const url = '/role/'+this.roledata.id+'/user/add'
            addRoleUser(url,this.newRoleUser).then(response => {
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
