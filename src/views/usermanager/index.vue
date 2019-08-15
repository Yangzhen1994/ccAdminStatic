<template>
  <div class="dashboard-editor-container" ref="dashboardEeditor">
    <div class=" clearfix">
      <div class="filter-area">
        <el-row>
          <el-col :span="7">
            <el-button type="primary" @click="addUser" size="small">新增用户<i class="el-icon--right el-icon-plus"></i>
            </el-button>
            <el-button type="primary" @click="delUser" size="small">删除<i class="el-icon--right el-icon-delete"></i>
            </el-button>
            <el-button type="primary" @click="resetPwd" size="small">重置密码</el-button>
          </el-col>
          <el-col :span="6">
            <span class="font12">角色</span>
            <el-select v-model="roleValue" placeholder="请选择" size="small">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span class="font12">部门</span>
            <el-select v-model="apartValue" placeholder="请选择" size="small">
              <el-option
                v-for="item in apartOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" style=" float: right">
            <el-input size="small" class="" v-on:keyup.enter.native="searchUser" v-model="keyword"
                      placeholder="登录名、姓名和手机号码"><i
              @click="searchUser" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-table
            :data="userTableData"
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
            <el-table-column
              prop="state"
              label="状态"
              align="center"
              width="">
              <template slot-scope="scope">
                <!-- PENDDING|STARTED|FINISHED|FAILED|ABORT-->
                <el-tag
                  :type="scope.row.state.toLowerCase() === 'started' ? 'success' : 'danger'"
                  disable-transitions>{{scope.row.state.toLowerCase() === 'started'? '启用' : '禁用'}}
                </el-tag>
              </template>

            </el-table-column>
            <el-table-column
              prop="report"
              label="操作"
              align="center"
              width="">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="editUser(scope.row)" style="color: #409EFF"></i>
                <i v-if="scope.row.state.toLowerCase() == 'started'"><img class="table_icon" :src="stopIconSrc" alt=""
                                                                          @click="changeUserState(scope.row)"/></i>
                <i v-if="scope.row.state.toLowerCase() != 'started'"><img class="table_icon" :src="playIconSrc" alt=""
                                                                          @click="changeUserState(scope.row)"/></i>
                <!-- <a href="javascript:;" @click="fetchBuildReport(scope.row.buildno)">查看</a>-->
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination-container" v-if="userTableData.length != 0">
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
          <el-input size="small" :disabled="isnewUserLnameDisable" v-model="newUser.loginname" placeholder="请输入内容"
                    required></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><span class="desc required_label">姓名</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" v-model="newUser.realname" placeholder="请输入内容" required></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><span class="desc required_label">所属部门</span></el-col>
        <el-col :span="12" :offset="1">
          <el-select v-model="newUser.belongApart" placeholder="请选择" size="small" style="width: 250px">
            <el-option
              v-for="item in newUserApartOptions"
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
          <el-input size="small" ref="newUserPhone" v-model="newUser.phonenumber" placeholder="请输入内容" required
                    @blur="vaitePhone"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><span class="desc">备注信息</span></el-col>
        <el-col :span="12" :offset="1">
          <el-input size="small" v-model="newUser.description" placeholder="请输入内容" type="textarea"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><span class="desc required_label">所属角色</span></el-col>
        <el-col :span="20" :offset="1">
          <el-checkbox-group v-model="newUser.roleList">
            <el-checkbox label="委办局用户"></el-checkbox>
            <el-checkbox label="系统管理用户"></el-checkbox>
            <el-checkbox label="数据质量用户"></el-checkbox>
            <el-checkbox label="角色一"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAdd" :disabled="building">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="pwddialogVisible"
      width="40%"
      class="add_dialog"
      @open="clearPwdNewContent"
      @close="closePwdHandle"
    >
      <el-form :rules="changeRules" ref="changeForm" :model="passwordObj">
        <el-form-item prop="oldpassword">
          <el-row>
            <el-col :span="4"><span class="desc">原密码</span></el-col>
            <el-col :span="12" :offset="1">
              <el-input name="oldpassword" v-model="passwordObj.oldpassword" placeholder="请输入内容"
                        type="password"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="newpassword">
          <el-row>
            <el-col :span="4"><span class="desc">新密码</span></el-col>
            <el-col :span="12" :offset="1">
              <el-input name="newpassword" v-model="passwordObj.newpassword" placeholder="请输入内容"
                        type="password"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmChangePwd" :disabled="building">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import addIcon from '@/assets/add.png/'
  import stopIcon from '@/assets/stop.svg/'
  import playIcon from '@/assets/play.svg/'
  import PanThumb from '@/components/PanThumb'
  import GithubCorner from '@/components/GithubCorner'
  import {MessageBox} from 'element-ui'
  import {getUserList, changeState, delUser, addUser, editUser, changePwd} from '@/api/article'
  import {validatePhone} from '@/utils/validate'

  export default {
    name: 'userindex',
    components: {},
    data() {
      const validateOldPassword = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码长度不得少于6个字符'))
        } else {
          callback()
        }
      }
      return {
        pwddialogVisible: false,
        isnewUserLnameDisable: false,
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
        dialogTitle: '新增用户',
        userTableData: [],
        multipleSelection: [],
        roleOptions: [
          {
            value: 'all',
            label: '全部'
          },
          {
            value: '委办局用户',
            label: '委办局用户'
          },
          {
            value: '系统管理用户',
            label: '系统管理用户'
          },
          {
            value: '数据质量用户',
            label: '数据质量用户'
          }
        ],
        newUserApartOptions: [
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
        apartOptions: [
          {
            value: 'all',
            label: '全部'
          },
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
        newUser: {
          loginname: '',
          realname: '',
          belongApart: '',
          phonenumber: '',
          roleList: [],
          description: ''
        },
        passwordObj: {
          oldpassword: '',
          newpassword: ''
        },
        changeRules: {
          oldpassword: [{required: true, trigger: 'blur', validator: validateOldPassword}],
          newpassword: [{required: true, trigger: 'blur', validator: validatePassword}]
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
      _searchUser(url, searchData) {
        getUserList(url, Object.assign({}, searchData, this.listQuery)).then(response => {
          this.userTableData = response.data.items
          console.log(response.data)
          this.total = response.data.total || response.data.total.items || response.data.length
          this.listLoading = false
          // 删除最后一页 无数据时候边界处理
          if(this.userTableData.length == 0 && this.listQuery.page >= Math.ceil(this.total / this.listQuery.size)){
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
        const url = '/user/list'
        const searchData = {
          owner: this.userid,
          search: ''
        }
        this._searchUser(url, searchData)
      },
      searchUser() {
        console.log(this.listQuery)
        if (!this.keyword && this.apartValue == '全部' && this.roleValue == '全部') {
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
          owner: this.userid,
          apart: this.apartValue == '全部' ? 'all' : this.apartValue,
          role: this.roleValue == '全部' ? 'all' : this.roleValue
        }

        /* const url = '/apps'*/
        const url = '/user/list'
        this._searchUser(url, searchData)
        /* /apps?search={search}&owner={user}
        search, 应⽤名关键字
        owner, ⽤户id*/
        console.log(this.keyword)
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        if (this.keyword) {
          this.searchUser()
        } else {
          this.getList()
        }
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        if (this.keyword) {
          this.searchUser()
        } else {
          this.getList()
        }
      },
      tableRowStyle: function () {
        return 'color: black;background-color: #FAFAFA;'
      },
      rowClick(data) {

      },
      editUser(data) {
        console.log(data)
        this.dialogTitle = '编辑用户'
        this.isnewUserLnameDisable = true
        this.dialogVisible = true
        setTimeout(() => {
          this.newUser.loginname = data.loginname
          this.newUser.realname = data.realname
          this.newUser.belongApart = data.belongApart
          this.newUser.phonenumber = data.phonenumber
          this.newUser.roleList = data.roleList || data.belongRole.split(',')
          this.newUser.description = data.description
          this.newUser.id = data.id
        })

      },
      changeUserState(data) {
        console.log(data)
        const state = data.state.toLowerCase() == 'started' ? 'disabled' : 'started'
        const str = data.state.toLowerCase() == 'started' ? '禁用失败~' : '启动失败'
        const tableUserId = data.id
        const url = 'user/state'
        const sendData = {
          id: tableUserId,
          state
        }
        changeState(url, sendData).then(response => {
          if (response.data.code.toString().charAt(0) == 2) {
            this.getList()
          }else{
            this.$message({
              type: 'error',
              message: str
            })
          }
        }).catch(err_ => {

        })
      },
      delUser() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的用户~'
          })
        } else {
          // todo 删除
          const url = '/user/delete'
          const delData = []
          this.multipleSelection.forEach((item, index) => {
            delData.push(item.id)
          })
          delUser(url, delData).then(response => {
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
      resetPwd() {
        if (this.multipleSelection.length == 1) {
          //todo 重置密码操作
          this.pwddialogVisible = true

        } else {
          this.$message({
            type: 'warning',
            message: '请选择一个用户~'
          })
        }
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
      },
      addUser() {
        this.isnewUserLnameDisable = false
        this.dialogTitle = '新增用户'
        this.dialogVisible = true
      },
      vaitePhone() {
        if (this.newUser.phonenumber && !validatePhone(this.newUser.phonenumber)) {
          this.$message({
            type: 'warning',
            message: '手机号不合法!'
          })
          this.newUser.phonenumber = ''
          this.$refs.newUserPhone.focus()
        }
      },
      clearNewContent() {
        this.newUser.loginname = '',
          this.newUser.realname = '',
          this.newUser.belongApart = '',
          this.newUser.phonenumber = '',
          this.newUser.roleList = [],
          this.newUser.description = ''

      },
      confirmAdd() {
        if (this.newUser.loginname == '') {
          this.$message({
            type: 'warning',
            message: '请输入登录名!'
          })
          return
        }
        if (this.newUser.realname == '') {
          this.$message({
            type: 'warning',
            message: '请输入姓名!'
          })
          return
        }
        if (this.newUser.belongApart == '') {
          this.$message({
            type: 'warning',
            message: '请选择部门!'
          })
          return
        }
        if (this.newUser.phonenumber == '') {
          this.$message({
            type: 'warning',
            message: '请输入手机号!'
          })
          return
        }
        if (this.newUser.roleList.length == 0) {
          this.$message({
            type: 'warning',
            message: '请选择所属角色!'
          })
          return
        }
        /* if (this.newUser.description == '') {
          this.$message({
            type: 'warning',
            message: '请输入描述!'
          })
          return
        }*/
        var str = '确认新增么？'
        if (this.dialogTitle == '编辑用户') {
          str = '确认修改么？'
        }
        this.$confirm(str)
          .then(_ => {
            this.building = true
            console.log(this.newUser)
            if (this.dialogTitle == '编辑用户') {
              editUser(this.newUser).then(response => {
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
              addUser(this.newUser).then(response => {
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
      _toggleMainContainerMarginL(str) {
        if (!str) {
          str = 0
        }
        // 右侧容器左边距归零
        // console.log(this.$refs.dashboardEeditor.parentNode.parentNode.parentNode)
        this.$refs.dashboardEeditor.parentNode.parentNode.parentNode.style.marginLeft = str
      },
      closePwdHandle() {
        this.dialogVisible = false
      },
      clearPwdNewContent() {
        // 清除表单验证
        this.$refs.changeForm && this.$refs.changeForm.resetFields()
        this.passwordObj.oldpassword = ''
        this.passwordObj.newpassword = ''
      },
      confirmChangePwd() {
        this.$refs.changeForm.validate(valid => {
          if (valid) {
            this.building = true
            const sendData = {}
            sendData.oldpass = this.passwordObj.oldpassword //this.$sha256(this.passwordObj.oldpassword)
            sendData.newpass = this.passwordObj.newpassword //this.$sha256(this.passwordObj.newpassword)
            sendData.id = this.multipleSelection[0].id
            changePwd(sendData).then(response => {
              if (response.data.code.toString().charAt(0) == 2) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '修改失败!'
                })
              }
              this.building = true
              setTimeout(() => {
                this.pwddialogVisible = false
              }, 200)
            }).catch(_err => {
              this.building = true
              setTimeout(() => {
                this.pwddialogVisible = false
              }, 200)
            })
          }
        })
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
