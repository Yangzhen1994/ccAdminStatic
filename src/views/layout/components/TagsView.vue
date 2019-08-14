<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)"
        :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{generateTitle(tag.title)}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>

    </scroll-pane>
    <span v-if="showArrowRight" class="arrow-right" @click="scrollLeft"><i :class="arrowicon"></i></span>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">{{$t('tagsView.close')}}</li>
      <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
      <li @click="closeAllTags">{{$t('tagsView.closeAll')}}</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/utils/i18n'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      showArrowRight: false,
      hasVerticalScroll: 0,
      arrowicon: 'el-icon-caret-right'
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
    window.onresize = function() {
      this.handleArrow()
    }.bind(this)
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route).then((views) => {
        this.handleArrow()
      })

      /* setTimeout(()=>{
        console.log(this.$refs.scrollPane.$el.querySelector('.scroll-wrapper').clientWidth)
      },20)*/
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
        this.handleArrow()
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
        this.handleArrow()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.handleArrow()
      this.$router.push('/')
    },
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
    },
    closeMenu() {
      this.visible = false
    },
    handleArrow() {
      this.$nextTick(() => {
        const scrollWraperWidth = this.$refs.scrollPane.$el.querySelector('.scroll-wrapper').clientWidth
        if (scrollWraperWidth > (this.$refs.scrollPane.$el.clientWidth)) {
          // 右侧有滚动条
          const left = this.$refs.scrollPane.$el.querySelector('.scroll-wrapper').style.left.replace('px', '') * 1

          // 右侧有滚动条
          /* if (document.querySelector('.main-container').clientHeight > document.documentElement.clientHeight){
            setTimeout(()=>{
              this.$refs.scrollPane.$el.querySelector('.scroll-wrapper').style.left = left-25+'px'
            })

          }else{
              //this.$refs.scrollPane.$el.querySelector('.scroll-wrapper').style.left = left+25+'px'
          }*/

          this.showArrowRight = true
        } else {
          this.showArrowRight = false
        }
      })
    },
    scrollLeft() {
      this.$refs.scrollPane.$el.querySelector('.scroll-wrapper').style.transition = '.2s linear'
      this.$refs.scrollPane.$el.querySelector('.scroll-wrapper').addEventListener('transitionend', function() {
        this.$refs.scrollPane.$el.querySelector('.scroll-wrapper').style.transition = 'none'
      }.bind(this))
      const tags = this.$refs.tag
      if (this.arrowicon == 'el-icon-caret-left') {
        this.$refs.scrollPane.moveToTarget(tags[0].$el)
        this.arrowicon = 'el-icon-caret-right'
        return
      }

      this.$refs.scrollPane.moveToTarget(tags[tags.length - 1].$el)
      this.arrowicon = 'el-icon-caret-left'
      // this.showArrowRight = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .arrow-right{
    cursor: pointer;
    margin-right: 15px;
    position: relative;
    top: -15px;
  }
.tags-view-container {
  border-bottom: 1px solid #E6E9EE;
  height: 49px;
  .tags-view-wrapper {
    display: inline-block;
    background: #fff;
    width: calc(100% - 40px);
    height: 48px;

   /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);*/
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 48px;
      line-height: 48px;
      border: 1px solid #E6E9EE;
      border-bottom: 0;
      color: #909399;
      background: #FAFAFA;
      padding: 0 10px;
      font-size: 14px;
      box-sizing: border-box;

      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #fff;
        color: #1890ff;


        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: calc(100% + 2px);
          height:3px;
          background:#1890ff ;
          /*border-radius: 50%;*/
          position: absolute;
          top: -1px;
          left: -1px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
    /*  color: #fff;
      background-color: #b4bccc;*/
     /* vertical-align: 2px;*/
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
       /* vertical-align: -3px;*/
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
