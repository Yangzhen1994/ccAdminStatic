<template>
  <scroll-bar>
    <router-link to="/">
      <div ref="logoParent" style="background-color:rgb(55, 69, 134);height: 60px;box-sizing: border-box;padding-top: 20px;box-sizing: border-box;padding-left: 20px;border-bottom:1px solid #5a6598">
        <img v-if="!sidebar.opened" :src="imgURL" alt style="opacity:0.9;cursor:pointer;">
        <div v-if="sidebar.opened" style="opacity:0.9;cursor:pointer;font-size: 15px;color: #fff">
          智慧城市服务平台后台管理系统
        </div>
      </div>
    </router-link>

    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="path"
      :collapse="isCollapse"
      background-color="#374586"
      text-color="#bfcbd9"
      active-text-color="#fff"
      @open="handleOPen"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'

  export default {
    data() {
      return {
        imgURL: '',
        imgList: [require('@/assets/logo.png'), require('@/assets/logo2.png')],
        showTimeout: 200,
        routerNameArr: []
      }
    },
    components: { SidebarItem, ScrollBar },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      path() {
        return this.$route.path
      },
      isCollapse() {
        if (this.sidebar.opened) {
          //this.imgURL = this.imgList[0]
          this.imgURL = ''
          setTimeout(() => {
            this.$refs.logoParent.style.paddingLeft = '20px'
          }, 80)
        } else {
          setTimeout(() => {
            this.imgURL = this.imgList[1]
            setTimeout(() => {
              this.$refs.logoParent.style.paddingLeft = '5px'
            }, 80)
          }, this.showTimeout)
        }

        return !this.sidebar.opened
      }
    },
    methods: {
      handleOPen(key) {
        console.log(key, this.path)
        let url = ''
        if (this.path.indexOf('detail') > -1 && this.path.indexOf(key) > -1) {
        /*  if(key == 'appmanager'){
            url = '/' + key + '/' + 'applist'
            this.$router.push({ path: url })
          }*/
          return
        }
        if (key.indexOf('detail') > -1 && this.path.indexOf('detail') > -1) {
          return
        }
        this.routerNameArr.forEach((item, index) => {
          if (key === item) {
            const prevname = this.routerNameArr[index - 2]
            const nextname = this.routerNameArr[index + 1]
            if (key.indexOf('detail') > -1 && this.path.indexOf('detail') < 0) {
              const prevname1 = key.replace('detail', '') + 'manager'
              url = '/' + prevname1 + '/' + key + '/' + nextname
            } else {
              url = '/' + key + '/' + nextname
            }
          }
        })


        this.$router.push({ path: url })
      },
      handleRouterArr(arr) {
        const _this = this
        arr.forEach(function(item, index) {
          if (item.name) {
            _this.routerNameArr.push(item.name)
          }
          if (item.children && item.children.length !== 0) {
            _this.handleRouterArr(item.children)
          }
        })
      }
    },
    created() {
      this.handleRouterArr(this.permission_routers)
      console.log(this.routerNameArr)
    }
  }
</script>
