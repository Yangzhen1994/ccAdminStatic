<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="40%"
      class="add_dialog"
      @open="clearNewContent"
      @close="closeHandle"
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
  import { isvalidUsername } from '@/utils/validate'
  import { changePwd } from '@/api/login'

export default {
    name: 'changePwd',
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
        dialogVisible: false,
        building: false,
        passwordObj: {
          oldpassword: '',
          newpassword: ''
        },
        changeRules: {
          oldpassword: [{ required: true, trigger: 'blur', validator: validateOldPassword }],
          newpassword: [{ required: true, trigger: 'blur', validator: validatePassword }]
        }
      }
    },
    computed: {},
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isVisible(val) {
        this.dialogVisible = val
      }
    },
    methods: {
      closeHandle() {
        this.dialogVisible = false
        this.$emit('closeDialog', this.dialogVisible)
      },
      clearNewContent() {
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
            let params = new URLSearchParams()
            params.append('oldpass', sendData.oldpass)
            params.append('newpass', sendData.newpass)
            changePwd(params).then((response) => {
              if (response.status.toString().charAt(0) == 2) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.dialogVisible = false
                setTimeout(() => {
                  // todo 是否跳转到登录页

                }, 200)
              } else {
                this.$message({
                  message: '修改失败',
                  type: 'error'
                })
              }
              this.building = false
            }).catch(err => {
              this.building = false
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
