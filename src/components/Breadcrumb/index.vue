<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{generateTitle(item.meta.title)}}</span>
        <router-link style=" color: #97a8be;" v-else :to="item.redirect||item.path">{{generateTitle(item.meta.title)}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [].concat(matched)
      }
      this.levelList = matched
      var jsglindex = {
        path: 'roleindex',
        name: 'rolemanager',
        redirect:'/rolemanager/roleindex',
        meta: {title: '角色管理', icon: 'dashboard', noCache: true, roles: ['admin', 'editor', 'user']}
      }
      var jsglflag = false
      var pzlbflag = false
      this.levelList = this.levelList.filter((item) => {
        return item.meta.breadHide != true
      })
      console.log(this.levelList)
      this.levelList.forEach((item,index) => {
        if(item.meta.title == '角色应用管理' || item.meta.title == '角色用户管理'){

          this.levelList.splice(index,0,jsglindex); //从第0个位置开始插入
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 60px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
