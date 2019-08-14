<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
    <hamburger v-if="sidebar.show" class="hamburger-container" :toggleClick="toggleSideBar"
               :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <!-- <error-log class="errLog-container right-menu-item"></error-log>

       <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
         <screenfull class="screenfull right-menu-item"></screenfull>
       </el-tooltip>

       <lang-select class="international right-menu-item"></lang-select>

       <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
         <theme-picker class="theme-switch right-menu-item"></theme-picker>
       </el-tooltip>-->

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <span class="username">{{name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="changePwd" style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
    <change-pwd :isVisible="showChangePwd" @closeDialog= "_closeDialog"></change-pwd>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import LangSelect from '@/components/LangSelect'
  import ThemePicker from '@/components/ThemePicker'
  import changePwd from '@/views/login/changePwd'

  export default {
    data() {
      return {
        showChangePwd: false
      }
    },
    components: {
      Breadcrumb,
      Hamburger,
      ErrorLog,
      Screenfull,
      LangSelect,
      ThemePicker,
      changePwd
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          //this.$router.push('/login') // push不会触发页面啥新 也就是mock.js 不会生成新的mock数据返回给前端 但是实际接口应该不会存在这个问题
           location.reload()// 会等待很久 因为清楚数据后 reload 当前页面还会路由判断 然后再重定向到 In order to re-instantiate the vue-router object to avoid bugs
        })
      },
      changePwd() {
        this.showChangePwd = true
        // 修改密码 /user put
        /* this.$message({
          message: '暂未开通',
          type: 'error'
        })*/
        /* this.$alert('修改成功').then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.reload()// In order to re-instantiate the vue-router object to avoid bugs
          })
        })*/
      },
      _closeDialog(data) {
        this.showChangePwd = data || false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .username {
    position: relative;
    top: -8px;
    margin-left: 5px;
  }

  .navbar {
    height: 60px;
    line-height: 60px;
    border-radius: 0px !important;
    border-bottom: 0;
    .hamburger-container {
      line-height: 58px;
      height: 60px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 60px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 12px;
          position: relative;
          .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50% 50%;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 16px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
